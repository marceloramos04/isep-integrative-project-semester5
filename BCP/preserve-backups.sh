#!/bin/bash

LOG_TAG="SARM_BACKUPS"

# Configuration
BACKUP_DIR="$1"
PRESERVE_DIR="$2"
DB_NAME="$3"

# Check if the backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
    logger -t $LOG_TAG -p local0.err "Backup directory does not exist: $BACKUP_DIR"
    echo "Serious failure: Backup directory does not exist: $BACKUP_DIR"
    exit 1
fi

# Create the preservation directory if it doesn't exist
if mkdir -p "$PRESERVE_DIR"; then
    logger -t $LOG_TAG -p local0.info "Created preservation directory: $PRESERVE_DIR"
else
    logger -t $LOG_TAG -p local0.err "Failed to create preservation directory: $PRESERVE_DIR"
    echo "Serious failure: Could not create preservation directory $PRESERVE_DIR"
    exit 1
fi

# Get the current date
LAST_DATE=$(date +%Y%m%d)

update_last_date() {
    LAST_DATE="$1"
    echo "Last date updated: $LAST_DATE"
    echo ""
}

# Function to get the last Sunday of a given month and year
get_first_sunday_of_month() {
    local year=$1
    local month=$2
    local first_day_of_month=$(date -d "$year-$month-01" +%Y-%m-%d)
    local first_sunday=$(date -d "$first_day_of_month +$(( (7 - $(date -d "$first_day_of_month" +%u)) % 7 )) days" +%Y%m%d)
    echo "$first_sunday"
}

# Create an array to store the names of the backup files
declare -a backups_to_preserve

# Function to add a backup to the preservation list
add_backup_to_preserve() {
    local backup=$1
    backups_to_preserve+=("$backup")
    echo "Backup added to the preservation list: $backup"
    echo "Current backups to preserve:"
    for backup in "${backups_to_preserve[@]}"; do
        echo "$backup"
    done
}

check_daily_backups(){
    echo "Checking daily backups..."
    logger -t $LOG_TAG -p local0.info "Checking daily backups..."
    # Copy backups names from the last 7 days to the preservation array
    for i in {0..6}; do
        DATE=$(date +%Y%m%d -d "$LAST_DATE - 1 days")
        update_last_date "$DATE"
        BACKUP=$(find "$BACKUP_DIR" -name "${DB_NAME}_${DATE}.sql")
        if [ -n "$BACKUP" ]; then
            if cp "$BACKUP" "$PRESERVE_DIR"; then
                echo "$BACKUP moved to $PRESERVE_DIR"
                logger -t $LOG_TAG "Moved $BACKUP to $PRESERVE_DIR"
                add_backup_to_preserve "$(basename "$BACKUP")"
                echo ""
            else
                logger -t $LOG_TAG -p user.err "Failed to move $BACKUP to $PRESERVE_DIR"
                echo "Serious failure: Could not move $BACKUP to $PRESERVE_DIR"
            fi
        fi
    done
}

check_weekly_backups(){
    echo "Checking weekly backups..."
    logger -t $LOG_TAG -p local0.info "Checking weekly backups..."
    # Copy backups names from the last 4 weeks to the preservation array
    for i in {0..3}; do
        if [ $i -eq 0 ]; then
            MONTH=$(date -d "$LAST_DATE - 1 month" +%m)
            YEAR=$(date -d "$LAST_DATE - 1 month" +%Y)
            DATE=$(get_first_sunday_of_month "$YEAR" "$MONTH")
        else
            DATE=$(date +%Y%m%d -d "$LAST_DATE + 7 days") # 7 days = 1 week
        fi
        update_last_date "$DATE"
        BACKUP=$(find "$PRESERVE_DIR" -name "${DB_NAME}_${DATE}.sql")
        if [ -n "$BACKUP" ]; then
            add_backup_to_preserve "$(basename "$BACKUP")"
            echo ""
        fi
    done
}

check_monthly_backups(){
    echo "Checking monthly backups..."
    logger -t $LOG_TAG -p local0.info "Checking monthly backups..."
    # Copy backups from the last 12 months to the preservation array
    for i in {0..10}; do
        MONTH=$(date -d "$LAST_DATE - 1 month" +%m)
        YEAR=$(date -d "$LAST_DATE - 1 month" +%Y)
        FIRST_SUNDAY=$(get_first_sunday_of_month "$YEAR" "$MONTH")
        update_last_date "$FIRST_SUNDAY"

        BACKUP=$(find "$PRESERVE_DIR" -name "${DB_NAME}_${FIRST_SUNDAY}.sql")
        if [ -n "$BACKUP" ]; then
            add_backup_to_preserve "$(basename "$BACKUP")"
            echo ""
        fi
    done
}

delete_old_backups(){
    # Remove old preserved backups that do not match the preservation criteria
    find "$PRESERVE_DIR" -name "${DB_NAME}_*.sql" -type f | sort -r | while read -r file; do
        FILENAME=$(basename "$file")
        echo "Checking backup: $FILENAME"
        if [[ " ${backups_to_preserve[@]} " =~ " ${FILENAME} " ]]; then
            logger -t $LOG_TAG -p local0.notice "Preserving backup: $FILENAME"
            echo "Preserving backup: $FILENAME"
            echo ""
        else
            rm "$file"
            logger -t $LOG_TAG -p local0.notice "Deleted old backup: $FILENAME"
            echo "Deleted old backup: $FILENAME"
            echo ""
        fi
    done
}

check_daily_backups
check_weekly_backups
check_monthly_backups
delete_old_backups

echo "Backup preservation completed."
logger -t $LOG_TAG "Backup preservation process completed."
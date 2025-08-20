#!/bin/bash

BACKUP_DIR="$1"
DATABASE_NAME="$2"
TODAY=$(date +%Y%m%d)

echo "Backup directory: $BACKUP_DIR"
echo "Database name: $DATABASE_NAME"
echo ""

# Find and delete backup files older than 7 days based on the date in the file name
find "$BACKUP_DIR" -name "${DATABASE_NAME}_*.sql" -type f | sort -r | while read -r file; do
    # Extract the date from the file name
    FILENAME=$(basename "$file")
    FILE_DATE=$(echo "$FILENAME" | sed -E "s/${DATABASE_NAME}_([0-9]{8}).sql/\1/")

    # Calculate the difference in days between the file date and today
    DATE_DIFF=$(( ( $(date -d "$TODAY" +%s) - $(date -d "$FILE_DATE" +%s) ) / 86400 ))

    # Delete the file if it is older than 7 days
    if [ "$DATE_DIFF" -gt 7 ]; then
        rm "$file"
        echo "Deleted old backup: $FILENAME"
    fi
done

echo "Old backups deleted from $BACKUP_DIR"
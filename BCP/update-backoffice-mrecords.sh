# access token " 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 " for user 1221638
# store credential " git config --global credential.helper store "
# persist username " git config --global user.name '1221638' " 

# ~/pi-sem5-24-25-g02/BackofficeMedicalRecords
CLONE_DIR=$1
# /etc/sarm/backoffice/mrecords
EXECUTION_DIR=$2
# sarm-backoffice-mrecords
SERVICE_NAME=$3

if [ -z "$CLONE_DIR" ] || [ -z "$EXECUTION_DIR" ] || [ -z "$SERVICE_NAME" ]; then
    echo "Error: Missing arguments."
    echo "Usage: $0 <clone_dir> <execution_dir> <service_name>"
    exit 1
fi

systemctl stop $SERVICE_NAME
echo "Service $SERVICE_NAME stopped"

cd $CLONE_DIR
git pull
echo "Git pull done"

rsync -av --delete ./ $EXECUTION_DIR
echo "Files copied"

cd $EXECUTION_DIR
npm install
echo "NPM install done"

systemctl restart $SERVICE_NAME
echo "Service $SERVICE_NAME restarted"

logger -t "sarm-backoffice-mrecords" "Service $SERVICE_NAME updated via git pull"
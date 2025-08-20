# Deployment info

## Server 330 (Marcelo)
**SSH Access**: vs-gate.dei.isep.ipp.pt:10330

### Backoffice - Main

- **Address**: vs-gate.dei.isep.ipp.pt:10330
- **Deployment dir**: /etc/sarm/backoffice/main
- **Service config file**: /etc/systemd/system/sarm-backoffice.service

- **Cloning dir**: ~/
- **Cloning and startup script**: ~/scripts/update-backoffice-main.sh
- **Logs file**: /var/log/sarm/backoffice/main.log

### Backoffice - MRecords

- **Address**: vs-gate.dei.isep.ipp.pt:30330
- **Deployment dir**: /etc/sarm/backoffice/mrecords
- **Service config file**: /etc/systemd/system/sarm-backoffice-mrecords.service

- **Cloning dir**: ~/
- **Cloning and startup script**: ~/scripts/update-backoffice-mrecords.sh
- **Logs file**: /var/log/sarm/backoffice/mrecords.log

## Server 572 (Rodrigo)

### Frontend

- **Address**: vs-gate.dei.isep.ipp.pt:10572
- **Deployment dir**: /etc/sarm/frontend/
- **Service config file**: /etc/systemd/system/sarm-frontend.service

- **Cloning dir**: ~/
- **Cloning and startup script**: ~/deployment/frontend/update.sh
- **Logs file**: /var/log/sarm/frontend.log

## Server 608 (Dephane)

### Frontend

- **Address**: vs-gate.dei.isep.ipp.pt:10608
- **Deployment dir**: /etc/sarm/frontend/
- **Service config file**: /etc/systemd/system/sarm-frontend.service

- **Cloning dir**: ~/
- **Cloning and startup script**: ~/scripts/update-frontend.sh
- **Logs file**: /var/log/sarm/frontend.log

## Frontend service config file

```
[Unit]
Description=SARM Frontend
After=network.target

[Service]
ExecStart=/etc/sarm/run-frontend.sh
WorkingDirectory=/etc/sarm/frontend/
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

## Frontend execution script

```
#!/bin/bash

cd /etc/sarm/frontend
ng serve --host 0.0.0.0 --port 2226
```

## Frontend setup script

```
#!/bin/bash

apt-get update # Update the package list
apt-get install -y nano nodejs npm rsync # Install nano, nodejs and rsync
npm install -g @angular/cli # Install Angular CLI
```
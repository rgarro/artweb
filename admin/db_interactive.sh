#!/bin/bash

source .env
echo "COnectando a $DB_NAME como $DB_USER"
mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME

#!/bin/bash

source .env
(echo "DROP TABLE artist;" ; cat data/artist.sql) | mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME

#!/bin/bash
chmod +x ./wait-for-it.sh
./wait-for-it.sh -t 180 market-cockpit-mssql-db:1433 -- echo "mssql-db is up"

python3 manage.py db migrate
python3 manage.py db upgrade
python3 app.py

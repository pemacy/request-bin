#!/bin/bash

# Exit immediately if any command fails
set -e

set -a        # automatically export all variables
source .env.development   # load variables from .env into the current shell
set +a

dropdb-17 --if-exists "$PGDATABASE"
createdb-17 "$PGDATABASE"
sudo -u "$PG_SUDO_USER" psql-17 "$PGDATABASE" -f ./src/db/postgres/schema.sql
sudo -u "$PG_SUDO_USER" psql-17 -d postgres -c "ALTER DATABASE ${PGDATABASE} OWNER TO ${PGUSER}"
sudo -u "$PG_SUDO_USER" psql-17 -d "$PGDATABASE" -c "ALTER TABLE bins OWNER TO ${PGUSER}"
sudo -u "$PG_SUDO_USER" psql-17 -d "$PGDATABASE" -c "ALTER TABLE records OWNER TO ${PGUSER}"

#!/bin/bash

# Exit immediately if any command fails
set -e

set -a        # automatically export all variables
source .env.test   # load variables from .env into the current shell
set +a

dropdb --if-exists "$PGDATABASE"
createdb "$PGDATABASE"
sudo -u "$PG_SUDO_USER" psql "$PGDATABASE" -f ./src/db/schema.sql
sudo -u "$PG_SUDO_USER" psql -d postgres -c "ALTER DATABASE ${PGDATABASE} OWNER TO ${PGUSER}"
sudo -u "$PG_SUDO_USER" psql -d "$PGDATABASE" -c "ALTER TABLE bins OWNER TO ${PGUSER}"
sudo -u "$PG_SUDO_USER" psql -d "$PGDATABASE" -c "ALTER TABLE requests OWNER TO ${PGUSER}"

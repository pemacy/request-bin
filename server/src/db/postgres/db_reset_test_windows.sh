#!/bin/bash

# Exit immediately if any command fails
set -e

set -a        # automatically export all variables
source .env.test   # load variables from .env into the current shell
set +a

dropdb --if-exists "$PGDATABASE"
createdb "$PGDATABASE"
psql "$PGDATABASE" -f ./src/db/postgres/schema.sql
psql -d postgres -c "ALTER DATABASE ${PGDATABASE} OWNER TO ${PGUSER}"
psql -d "$PGDATABASE" -c "ALTER TABLE bins OWNER TO ${PGUSER}"
psql -d "$PGDATABASE" -c "ALTER TABLE records OWNER TO ${PGUSER}"
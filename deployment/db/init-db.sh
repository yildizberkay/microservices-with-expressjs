#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE service_auth;
    CREATE DATABASE service_ticket;
    GRANT ALL PRIVILEGES ON DATABASE service_auth TO postgres;
    GRANT ALL PRIVILEGES ON DATABASE service_ticket TO postgres;
EOSQL

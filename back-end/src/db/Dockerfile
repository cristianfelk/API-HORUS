FROM postgres:15.2

RUN apt-get update && apt-get install -y \
    postgis postgresql-15-postgis-3 \
    && rm -rf /var/lib/apt/lists/*

COPY init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=APP_SECRETARIA

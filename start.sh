#!/bin/sh

if [ -z "$DATABASE_URL" ]; then
  echo "Erro: A variável DATABASE_URL não está configurada."
  exit 1
fi

DB_HOST=$(echo $DATABASE_URL | sed -n 's|.*://.*:\(.*\)@\(.*\):\([0-9]*\)/.*|\2|p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's|.*://.*:\(.*\)@\(.*\):\([0-9]*\)/.*|\3|p')

echo "Aguardando o banco de dados em $DB_HOST:$DB_PORT..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "Banco de dados está online!"

echo "Executando as migrations..."
npm run run:migration

echo "Iniciando o servidor..."
npm run start:prod
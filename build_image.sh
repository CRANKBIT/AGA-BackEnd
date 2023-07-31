#!/bin/sh

# Read the values from Jenkins credentials files using cat
MONGO_URI=$(cat "$MONGO_URI")
JWT_SECRET=$(cat "$JWT_SECRET")
JWT_LIFETIME=$(cat "$JWT_LIFETIME")
JWT_SECRET_KEY=$(cat "$JWT_SECRET_KEY")
PORT=$(cat "$PORT")
EMAIL_SERVER_PASSWORD=$(cat "$EMAIL_SERVER_PASSWORD")
EMAIL_SERVER_PORT=$(cat "$EMAIL_SERVER_PORT")
EMAIL_SERVER_HOST=$(cat "$EMAIL_SERVER_HOST")
EMAIL_FROM=$(cat "$EMAIL_FROM")
EMAIL_SERVER_USER=$(cat "$EMAIL_SERVER_USER")
SENDGRID_API_KEY=$(cat "$SENDGRID_API_KEY")

# run docker build command with the provided environment variables
docker build \
  --build-arg MONGO_URI="${MONGO_URI}" \
  --build-arg JWT_SECRET="${JWT_SECRET}" \
  --build-arg JWT_LIFETIME="${JWT_LIFETIME}" \
  --build-arg JWT_SECRET_KEY="${JWT_SECRET_KEY}" \
  --build-arg PORT="${PORT}" \
  --build-arg EMAIL_SERVER_PASSWORD="${EMAIL_SERVER_PASSWORD}" \
  --build-arg EMAIL_SERVER_PORT="${EMAIL_SERVER_PORT}" \
  --build-arg EMAIL_SERVER_HOST="${EMAIL_SERVER_HOST}" \
  --build-arg EMAIL_FROM="${EMAIL_FROM}" \
  --build-arg EMAIL_SERVER_USER="${EMAIL_SERVER_USER}" \
  --build-arg SENDGRID_API_KEY="${SENDGRID_API_KEY}" \
  -t crankbit:1.0.0 .


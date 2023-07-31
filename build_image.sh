#!/bin/sh

# Read the values from Jenkins credentials files using echo
MONGO_URI=$(echo "$MONGO_URI")
JWT_SECRET=$(echo "$JWT_SECRET")
JWT_LIFETIME=$(echo "$JWT_LIFETIME")
JWT_SECRET_KEY=$(echo "$JWT_SECRET_KEY")
PORT=$(echo "$PORT")
EMAIL_SERVER_PASSWORD=$(echo "$EMAIL_SERVER_PASSWORD")
EMAIL_SERVER_PORT=$(echo "$EMAIL_SERVER_PORT")
EMAIL_SERVER_HOST=$(echo "$EMAIL_SERVER_HOST")
EMAIL_FROM=$(echo "$EMAIL_FROM")
EMAIL_SERVER_USER=$(echo "$EMAIL_SERVER_USER")
SENDGRID_API_KEY=$(echo "$SENDGRID_API_KEY")

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


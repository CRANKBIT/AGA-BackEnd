# base image for the container
FROM node:18-alpine

# set as a working directory in the container
WORKDIR /app

# Package.json will be copied into the working directory of the container
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy files and folders with dependencies from the host machine to the container
COPY . ./

# Set the build argument directive
ARG MONGO_URI
ARG JWT_SECRET
ARG JWT_LIFETIME
ARG JWT_SECRET_KEY
ARG PORT
ARG EMAIL_SERVER_PASSWORD
ARG EMAIL_SERVER_PORT
ARG EMAIL_SERVER_HOST
ARG EMAIL_FROM
ARG EMAIL_SERVER_USER
ARG SENDGRID_API_KEY

# Set environment variables from .env file
ENV MONGO_URI=${MONGO_URI}
ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_LIFETIME=${JWT_LIFETIME}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
ENV PORT=${PORT}
ENV EMAIL_SERVER_PASSWORD=${EMAIL_SERVER_PASSWORD}
ENV EMAIL_SERVER_PORT=${EMAIL_SERVER_PORT}
ENV EMAIL_SERVER_HOST=${EMAIL_SERVER_HOST}
ENV EMAIL_FROM=${EMAIL_FROM}
ENV EMAIL_SERVER_USER=${EMAIL_SERVER_USER}
ENV SENDGRID_API_KEY=${SENDGRID_API_KEY}



# Allow to port 8080 of the container
EXPOSE 8080

CMD ["npm", "start"]
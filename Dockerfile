# Specify the base image
FROM node:18-alpine

# Create a directory for the app
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app files
COPY . .

#Use ARG command to define a build-time variable for each environment variable I want to pass.
ARG MONGO_URI
ARG JWT_SECRET
ARG JWT_LIFETIME
ARG JWT_SECRET_KEY
ARG PORT
ARG MAIN_HOST
ARG AWS_BUCKET_REGION
ARG AWS_BUCKET_NAME
ARG EMAIL_USER
ARG EMAIL_PASS

# Use  ENV command to set the environment variables inside the container
ENV MONGO_URI=${MONGO_URI}
ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_LIFETIME=${JWT_LIFETIME}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
ENV PORT=${PORT}
ENV MAIN_HOST=${MAIN_HOST}
ENV AWS_BUCKET_REGION=${AWS_BUCKET_REGION}
ENV AWS_BUCKET_NAME=${AWS_BUCKET_NAME}
ENV EMAIL_USER=${EMAIL_USER}
ENV EMAIL_PASS=${EMAIL_PASS}



# Build the app
RUN npm run build 

# Backed server is running at 8080
EXPOSE 8080

# Start the app

CMD ["npm", "start"]

# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci --production

# Copy the built app to the container
COPY .next ./.next
COPY public ./public

# Expose the desired port (e.g., 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

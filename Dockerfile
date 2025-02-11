# Use Node.js official image as base
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port (Make sure it matches the port in your server)
EXPOSE 4000

# Command to run the app
CMD ["node", "server.js"]

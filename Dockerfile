# Use the official Node.js image as base
FROM node:14

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY index.js ./
COPY Middleware ./Middleware
COPY Routes ./Routes
COPY Models ./Models


# Expose the port on which your app runs
EXPOSE 5000

# Command to run your application
CMD ["node", "index.js"]

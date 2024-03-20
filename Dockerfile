# Dockerfile

# Base Image
ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
# Create app directory
WORKDIR /usr/src/app

# Copy package.json so that package manager commands can be used.
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /.

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port that the application listens on.
EXPOSE 10655

# Run the application.
CMD ["npm", "run", "start"]
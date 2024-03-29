# Dockerfile

# Base Image
ARG NODE_VERSION=20.10.0
#ARG NODE_ENV=production

FROM node:${NODE_VERSION} as builder

# Set working directory for all build stages.
# Create app directory
WORKDIR /app

# Copy package.json so that package manager commands can be used.
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY /src/ /app/src/
COPY /prisma /app//prisma/
COPY /package*.json /tsconfig* /nest-cli.json /app/

# Install app dependencies
RUN npm install
RUN npm run build

## Creates a "dist" folder with the production build
#CMD ["npm", "run", "build"]

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY --from=builder /app ./

## Expose the port that the application listens on.
EXPOSE 10655
RUN npx prisma generate

## Run the application.
ENTRYPOINT ["npm", "run", "start"]
#CMD tail -f /dev/null


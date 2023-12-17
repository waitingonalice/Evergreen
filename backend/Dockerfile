# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.0.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js/Prisma"

# Node.js/Prisma app lives here
WORKDIR /server

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential openssl pkg-config python-is-python3

COPY ../../package.json ../../yarn.lock ./
COPY ../../shared .
# Copy application code
COPY . .

RUN yarn install --production=false --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN yarn run build

# Remove development dependencies
RUN yarn install --production --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /server/backend/package.json /server/backend/package.json
COPY --from=build /server/backend/build /server/backend/build
COPY --from=build /server/shared/package.json /server/shared/package.json
COPY --from=build /server/shared/dist /server/shared/dist
COPY --from=build /server/node_modules /server/node_modules
COPY --from=build /server/package.json /server/lerna.json /server/

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "yarn", "run", "start:backend" ]

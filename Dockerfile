FROM node

# Install graphics magick
RUN apt-get update && apt-get install -y graphicsmagick && apt-get install -y imagemagick
RUN npm install -g pnpm

# Create app directory
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN pnpm install > /dev/null

EXPOSE 8000
CMD [ "pnpm", "dev" ]

# syntax=docker/dockerfile:1

# ARG NODE_VERSION=20.0.0

# FROM node as base
# WORKDIR /app
# EXPOSE 3000

# FROM base as dev
# RUN apt-get update \
#     apt-get install -y graphicsmagick \
#     apt-get install -y imagemagick
# RUN pnpm install > /dev/null \
#     --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=pnpm-lock.yaml \
#     --mount=type=cache,target=/root/.pnpm \
#     pnpm ci --include=dev
# USER node
# COPY . .
# CMD [ "pnpm", "start:dev" ]

# FROM base as prod
# RUN apt-get update \
#     apt-get install -y graphicsmagick \
#     apt-get install -y imagemagick
# RUN pnpm install > /dev/null \
#     --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=pnpm-lock.yaml \
#     --mount=type=cache,target=/root/.npm \
#     pnpm ci --omit=dev
# USER node
# COPY . .
# CMD [ "pnpm", "start" ]
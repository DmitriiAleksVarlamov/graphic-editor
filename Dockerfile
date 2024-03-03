FROM node

# Install graphics magick
RUN apt-get update
RUN apt-get install -y graphicsmagick
RUN apt-get install -y imagemagick
RUN npm install -g pnpm

# Create app directory
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN pnpm install > /dev/null

EXPOSE 8000
CMD [ "pnpm", "start" ]
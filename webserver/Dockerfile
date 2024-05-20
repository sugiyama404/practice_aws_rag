FROM node:20.12.2-buster-slim as development

WORKDIR /usr/src/app
ENV PORT 80
ENV CHOKIDAR_USEPOLLING=true

# Cypress install
RUN npx cypress@13.9.0 install

RUN apt-get update \
    && apt-get install -y \
    xvfb=2:1.20.4-1+deb10u14 libglib2.0-dev=2.58.3-2+deb10u6  \
    libnss3=2:3.42.1-1+deb10u8 libatk1.0-dev=2.30.0-2  \
    libatk-bridge2.0-dev=2.30.0-5 libcups2-dev=2.2.10-6+deb10u9  \
    libgtk-3-dev=3.24.5-1 libasound2-dev=1.1.8-1 \
    --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY ./app/package*.json ./
RUN npm install
COPY ./app .

# For build
FROM node:20.12.2-buster-slim as build
WORKDIR /app
COPY ./app/package*.json ./
RUN npm ci
COPY ./app .
RUN npm run build

# For staging
FROM gcr.io/distroless/nodejs20-debian12:nonroot as staging
WORKDIR /app
ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3000

COPY --from=build --chown=nonroot:nonroot /app /app

USER nonroot
EXPOSE 3000

CMD ["/app/node_modules/next/dist/bin/next", "start", "-p", "3000"]

FROM node:20.12.2-buster-slim as development

WORKDIR /usr/src/app

ENV PORT 80

ENV CHOKIDAR_USEPOLLING=true

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
ENV PORT 80

COPY --from=build --chown=nonroot:nonroot /app /app

USER nonroot
EXPOSE 80

CMD ["/app/node_modules/next/dist/bin/next", "start"]

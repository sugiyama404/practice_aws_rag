FROM python:3.12-slim-bullseye

WORKDIR /opt
COPY requirements.txt .

# hadolint ignore=DL3013
RUN pip install --no-cache-dir -r requirements.txt  --default-timeout=3000

COPY . .



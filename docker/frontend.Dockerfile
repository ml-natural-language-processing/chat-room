FROM ubuntu:20.04
#FROM node:16.16

RUN mv /etc/apt/sources.list /etc/apt/sources.list.bat
COPY ./docker/sources.list /etc/apt/sources.list

RUN apt update && \
  apt install -y --no-install-recommends git wget unzip bzip2 sudo build-essential vim && \
  apt install -y apt-transport-https ca-certificates && \
  apt clean && \
  rm -rf /var/lib/apt/lists/*

RUN sudo apt update && sudo apt install curl -y

# there are 2 ways to install nodejs, the first is recommended.
ENV NODE_VERSION=16.16.0
RUN wget -qO- https://mirror.ghproxy.com/https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="${NVM_DIR}/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# mothod 2
# RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
# RUN apt install nodejs -y

RUN npm install --location=global pnpm
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

COPY ./web/apps/chatroom/package.json /home/package.json
RUN mkdir -p /root/.local/share/pnpm/global/5 && \
  cp /home/package.json /root/.local/share/pnpm/global/5/ &&\
  rm -f /home/package.json

# ENV PNPM_HOME="/root/.local/share/pnpm"
# ENV PATH="${PNPM_HOME}:${PATH}"
WORKDIR /home

RUN mkdir ~/.npm-global && \
    npm config set prefix '~/.npm-global'
ENV PATH=~/.npm-global/bin:$PATH

RUN npm install "path@~0.12.7" --location=global && \
npm install "ts-protoc-gen@~0.15.0"          --location=global && \
npm install "protobufjs@~6.11.3"             --location=global && \
npm install "google-protobuf@~3.20.1"        --location=global && \
npm install "@types/google-protobuf@~3.15.6" --location=global && \
npm install "@types/jquery@~3.5.14"          --location=global

RUN npm install "@zilliz/milvus2-sdk-node@~2.0.3" --location=global && \
npm install "protoc-gen-grpc@~2.0.3"         --location=global && \
npm install "grpc-web@~1.3.0"                --location=global && \
npm install "@grpc/grpc-js@~1.6.7"           --location=global && \
npm install "@grpc/proto-loader@~0.6.12"     --location=global

RUN npm install "@types/node@~17.0.36"       --location=global && \
npm install "copy-webpack-plugin@~11.0.0"    --location=global && \
npm install "gts@~3.1.0"                     --location=global && \
npm install "ts-loader@~9.3.0"               --location=global && \
npm install "typescript@~4.7.2"              --location=global && \
npm install "webpack@~5.72.1"                --location=global && \
npm install "webpack-cli@~4.9.2"             --location=global && \
npm install "webpack-dev-server@~4.9.0"      --location=global && \
npm install "http-proxy-middleware@~2.0.6"   --location=global && \
npm install "axios@~0.27.2"                  --location=global

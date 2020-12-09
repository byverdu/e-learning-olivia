#!/bin/bash

ERROR_COLOR="\033[41m"
SUCCESS_COLOR="\033[32m"
END_COLOR="\033[0m"

function print_success () {
  echo -e "${SUCCESS_COLOR}$1${END_COLOR}$2"
}

function print_error () {
  echo -e "${ERROR_COLOR}$1${END_COLOR}$2"
}

if ! [ -x "$(command -v yarn)" ]; then
  print_error "Please install yarn" "\nhttps://classic.yarnpkg.com/en/docs/install" >&2
  exit 1
fi

print_success "Removing old build folder"

rm -rf ./build

print_success "Building latest changes"

yarn build

if ! [ -x "$(command -v docker)" ]; then
  print_error "Please install docker" "\nhttps://docs.docker.com/get-docker/" >&2
  exit 1
fi

print_success "Building latest docker image"

docker build -t youtube:latest .

print_success "Start docker container"

docker run -i -e YOUTUBE_API_KEY=$YOUTUBE_API_KEY -p 9000:9000/tcp --detach youtube:latest

FROM node

WORKDIR /
COPY /build /build
COPY package.json /

CMD [ "yarn", "start" ]

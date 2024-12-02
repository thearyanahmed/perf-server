FROM node:20-alpine

RUN mkdir -p /usr/app/node_modules \
  && chown -R node:node /usr/app

WORKDIR /usr/app

COPY --chown=node:node package*.json ./

USER node

COPY --chown=node:node . .

RUN npm install

EXPOSE 3000
ENTRYPOINT ["node"]
CMD ["index.js"]

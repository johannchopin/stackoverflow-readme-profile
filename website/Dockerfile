FROM node:alpine
WORKDIR /app
COPY ./package.json ./yarn.lock /app
RUN yarn
COPY . /app/
EXPOSE 3000
CMD ["npm", "run", "dev"]

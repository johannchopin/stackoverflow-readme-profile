FROM node:17-alpine
WORKDIR /app
COPY ./package.json ./yarn.lock /app/
RUN npm install
COPY . /app/
EXPOSE 5000
CMD ["npm", "run", "serve"]

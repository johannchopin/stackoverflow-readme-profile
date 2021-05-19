FROM node:14-alpine
WORKDIR /stackoverflow-readme-profile-app
COPY package.json /stackoverflow-readme-profile-app
RUN npm install
COPY . /stackoverflow-readme-profile-app
CMD npm run serve
EXPOSE 5000
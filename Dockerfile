FROM node
WORKDIR /next-test
COPY package.json package-lock.json /next-test/
RUN npm install
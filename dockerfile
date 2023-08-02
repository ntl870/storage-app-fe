FROM node:18
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "./"]
# COPY ["yarn.lock", "./"]

RUN npm install --include=dev
# RUN npm i -g vite

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]
FROM node:16

# App Dir
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm ci --only=production
COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]
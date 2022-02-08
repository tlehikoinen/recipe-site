# Dockerfile for React frontend

FROM node:16.13.2-alpine

#WORKDIR /usr/app/
WORKDIR /frontend

COPY package*.json ./

### Install dependencies
RUN npm install --silent

# Copy local files to frontend folder
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

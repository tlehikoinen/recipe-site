# Dockerfile for Node backend

FROM node:16.13.2-alpine

#WORKDIR /usr/app/
WORKDIR /backend

COPY package*.json ./

### Install dependencies
RUN npm install --silent

# Copy local files to frontend folder
#COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]

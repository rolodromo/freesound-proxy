FROM node:10-alpine

COPY . . 
RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]

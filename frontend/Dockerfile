FROM node:18

WORKDIR /app

COPY code/package*.json ./code/
RUN npm install --prefix ./code

COPY code/ ./code/

EXPOSE 5173

CMD ["npm", "run", "dev-host", "--prefix", "./code"]

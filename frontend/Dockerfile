FROM node:18

WORKDIR /app

COPY frontend/code/package*.json ./code/
RUN npm install --prefix ./code

COPY frontend/code/ ./code/

EXPOSE 5173

CMD ["npm", "run", "dev-host", "--prefix", "./code"]

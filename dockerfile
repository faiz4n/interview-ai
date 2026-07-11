#Build the frontend

FROM node:22-alpine AS frontend-instance

WORKDIR /app

COPY ./Frontend/package*.json ./

RUN npm install

COPY ./Frontend/ .

RUN npm run build

#Build the backend
FROM node:22-alpine AS backend-instance

WORKDIR /app

COPY ./Backend/package*.json ./

RUN npm install

COPY ./Backend/ .

COPY --from=frontend-instance /app/dist ./public

EXPOSE 3000

CMD ["npm", "start"]
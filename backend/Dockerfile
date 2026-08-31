FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Génération du client Prisma à partir du schéma copié
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "dev"]
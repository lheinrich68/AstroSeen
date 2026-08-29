FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5173

# --host est indispensable : par défaut Vite n'écoute que sur localhost,
# invisible depuis l'extérieur du conteneur.
CMD ["npm", "run", "dev", "--", "--host"]
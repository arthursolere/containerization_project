# Utiliser l’image officielle Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Exposer le port 4000
EXPOSE 4000

# Démarrer le serveur
CMD ["node", "server.js"]

# Étape 1 : Utiliser une image Node.js
FROM node:latest 

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le reste du projet
COPY . .

# Étape 7 : Exposer le port de l'API
EXPOSE 3000

# Étape 8 : Commande pour démarrer le serveur
CMD ["npm", "run", "dev"]

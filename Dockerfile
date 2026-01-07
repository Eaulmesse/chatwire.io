FROM node:20-alpine

# Installation de openssl (nécessaire pour Prisma sur Alpine)
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

# On copie d'abord les fichiers de dépendances
COPY package*.json ./
# On copie aussi le dossier prisma car la génération des types se fait souvent au install
COPY prisma ./prisma/

RUN npm install

# ÉTAPE CLÉ : Générer le client Prisma pour que TypeScript reconnaisse "this.prisma.user"
RUN npx prisma generate

COPY . .

EXPOSE 3000

# Utilisation d'un script de démarrage pour s'assurer que la DB est prête
CMD ["npm", "run", "start:dev"]
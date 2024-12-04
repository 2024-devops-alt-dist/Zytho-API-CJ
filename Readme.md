# Zythologue API 

## Contexte du projet

Après la mise en place de notre base de données pleine d'infos sur les bières artisanales, il est temps de s'attaquer à la prochaine étape : le développement de l'API.

Créer une API REST qui va nous permettre de manipuler les informations sur les bières avec des opérations de base comme créer, lire, mettre à jour, et supprimer (CRUD).

En utilisant la base de données créée selon les spécifications du brief précédent, cette API permettra de naviguer à travers un univers de bières artisanales venues des quatre coins du monde, de les partager et de découvrir de nouvelles saveurs.

## Installation

### 1. Clonez le projet

Clonez ce repository sur votre machine locale en utilisant Git :

`git clone https://github.com/2024-devops-alt-dist/Zytho-API-CJ.git`

### 2. Installez les dépendances

Installez les dépendances du projet avec npm :

`npm install`

### 3. Configurez la base de données PostgreSQL

Si vous utilisez Docker, la base de données PostgreSQL sera lancée via Docker Compose. Assurez-vous que vous avez configuré votre fichier `.env` pour correspondre à votre base de données :

#### Exemple de fichier `.env` :
```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=my_database
DB_PORT=5432
```

## Démarrage

### 1. Démarrez la bdd PostgreSQL 
Si vous utilisez Docker pour la bdd, exécutez la commande suivante :

`docker-compose up -d`

### 2. Exécutez le serveur

Démarrez le serveur Express :

`npm run dev`

Le serveur accessible sur `http://localhost:3000`.

## API
### Tester
Via POSTMAN 
ou
Via SwaggerUi : http://localhost:3000/api-docs/

### Endpoints disponibles : 
#### 1. Beers :

***GET /beers***: http://localhost:3000/api/v1/beers
***GET /beers/{id}***: http://localhost:3000/api/v1/beers/12
***POST /beers***: http://localhost:3000/api/v1/beers
Exemple:
```
{
    "name": "Test - Add new beer",
    "type": "Test - Add new beer",
    "alcool_pourcent": 6.5,
    "details_beer_id": 1,
    "brewery_id": 2
}
```
***PUT /beers/{id}***: http://localhost:3000/api/v1/beers/10
Exemple:
```
{
    "name": "UPDATE TEST",
    "type": "UPDATE TEST",
    "alcool_pourcent": 18.0
}
```
***DELETE /beers/{id}***: http://localhost:3000/api/v1/beers/28

#### 2. Breweries :

***GET /breweries***: http://localhost:3000/api/v1/breweries
***GET /breweries/{id}***: http://localhost:3000/api/v1/breweries/3
***POST /breweries***: http://localhost:3000/api/v1/breweries
Exemple:
```
{
    "name": "TEST ADD BREWERY",
    "address": "TEST ADD BREWERY",
    "country": "TEST ADD BREWERY",
    "description": "TEST ADD BREWERY",
    "schedules": "TEST ADD BREWERY",
    "url_social_media": "TEST ADD BREWERY"
}
```
***PUT /breweries/{id}***: http://localhost:3000/api/v1/breweries/5
Exemple:
```
{
    "name": "TEST UPDATE BREWERY",
    "address": "TEST UPDATE BREWERY",
    "country": "TEST UPDATE BREWERY",
    "description": "TEST UPDATE BREWERY",
    "schedules": "TEST UPDATE BREWERY",
    "url_social_media": "TEST UPDATE BREWERY"
}
```
***DELETE /breweries/{id}***: http://localhost:3000/api/v1/breweries/10

### Documentation swagger
Voir : 
- Dossier "src/routes/*"
- Fichier swagger.ts
# Zythologue API 

## Contexte du projet

Après la mise en place de notre base de données pleine d'infos sur les bières artisanales, il est temps de s'attaquer à la prochaine étape : le développement de l'API.

Créer une API REST qui va nous permettre de manipuler les informations sur les bières avec des opérations de base comme créer, lire, mettre à jour, et supprimer (CRUD).

En utilisant la base de données créée selon les spécifications du brief précédent, cette API permettra de naviguer à travers un univers de bières artisanales venues des quatre coins du monde, de les partager et de découvrir de nouvelles saveurs.

## Installation

Clonez ce repository sur votre machine locale en utilisant Git :

`git clone https://github.com/2024-devops-alt-dist/Zytho-API-CJ.git`

## Démarrage

### 1. Exécutez le serveur et la bdd PostgreSQL 

`docker compose up --build`
puis 
`docker compose up`


### 2. Créer repectoire BDD

Dans Dbeaver, créer le repertoire qui va réceptionner notre bdd

Le serveur accessible sur `http://localhost:3000`.

## API
### 1. Tester
Via POSTMAN 
ou
avec SwaggerUi : http://localhost:3000/api-docs/.

### 2. Endpoints disponibles : 
#### 2.1. Beers :

- ***GET /beers***: http://localhost:3000/api/v1/beers.

- ***GET /beers/{id}***: http://localhost:3000/api/v1/beers/12.

- ***POST /beers***: http://localhost:3000/api/v1/beers.
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
- ***PUT /beers/{id}***: http://localhost:3000/api/v1/beers/10.
Exemple:
```
{
    "name": "UPDATE TEST",
    "type": "UPDATE TEST",
    "alcool_pourcent": 18.0
}
```
- ***DELETE /beers/{id}***: http://localhost:3000/api/v1/beers/28.

#### 2.2. Breweries :

- ***GET /breweries***: http://localhost:3000/api/v1/breweries.

- ***GET /breweries/{id}***: http://localhost:3000/api/v1/breweries/3.

- ***POST /breweries***: http://localhost:3000/api/v1/breweries.

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
- ***PUT /breweries/{id}***: http://localhost:3000/api/v1/breweries/5.*

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
- ***DELETE /breweries/{id}***: http://localhost:3000/api/v1/breweries/10.

#### 2.3. Users :

- ***GET /users***: http://localhost:3000/api/v1/users.

- ***GET /users/{id}***: http://localhost:3000/api/v1/users/6.

- ***POST /users***: http://localhost:3000/api/v1/users.

Exemple:
```
{
    "firstname": "Test ADD USER",
    "email": "testAdd@user.fr",
    "password": "123456789"
}
```
- ***PUT /users/{id}***: http://localhost:3000/api/v1/users/5.

Exemple:
```
{
    "firstname": "Test UPDATE USER",
    "email": "updateTes@user.fr",
    "password": "123456789"
}
```
***DELETE /users/{id}***: http://localhost:3000/api/v1/users/8.

#### 2.4. Details_beer :
- ***GET /details_beer***: http://localhost:3000/api/v1/details_beer.

- ***GET /details_beer/{id}***: http://localhost:3000/api/v1/details_beer/6.

- ***POST /details_beer***: http://localhost:3000/api/v1/details_beer.

Exemple:
```
{
    "description": "ADD NEW DETAILS BEER",
    "color": "ADD NEW",
    "pays": "ADD NEW",
    "amertume": 2,
    "douceur": 4,
    "fruite": 3,
    "fermentation": "ADD NEW",
    "conditionnement": "ADD NEW",
    "contenance": 33,
    "ibu": 15,
    "ebc": 10
}
```
- ***PUT /details_beer/{id}***: http://localhost:3000/api/v1/details_beer/3.

Exemple:
```
{
    {
    "description": "UPDATE DETAILS BEER",
    "color": "UPDATE NEW",
    "pays": "UPDATE NEW",
    "amertume": 2,
    "douceur": 4,
    "fruite": 3,
    "fermentation": "UPDATE NEW",
    "conditionnement": "UPDATE NEW",
    "contenance": 33,
    "ibu": 15,
    "ebc": 10
}
}
```
- ***DELETE /details_beer/{id}***: http://localhost:3000/api/v1/details_beer/4.

#### 2.5. Category :
- ***GET /categories***: http://localhost:3000/api/v1/categories.

- ***GET /categories/{id}***: http://localhost:3000/api/v1/categories/5.

- ***POST /categories***: http://localhost:3000/api/v1/categories.

- ***PUT /categories/{id}***: http://localhost:3000/api/v1/categories/5.

- ***DELETE /categories/{id}***: http://localhost:3000/api/v1/categories/11.


#### 2.6. Ingredient :
- ***GET /ingredients***: http://localhost:3000/api/v1/ingredients.

- ***GET /ingredients/{id}***: http://localhost:3000/api/v1/ingredients/1.

- ***POST /ingredients***: http://localhost:3000/api/v1/ingredients.

- ***PUT /ingredients/{id}***: http://localhost:3000/api/v1/ingredients/5.

- ***DELETE /ingredients/{id}***: http://localhost:3000/api/v1/ingredients/15.

### Documentation swagger
Voir : 
- Dossier "src/routes/*"
- Fichier swagger.ts
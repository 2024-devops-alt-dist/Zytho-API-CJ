import express, { Application } from "express";
const app: Application = express();

import { setupSwagger } from "../swagger";

// Import des routes
import { router as beersRoutes } from "./routes/beersRoutes";
import { router as breweriesRoutes } from "./routes/breweriesRoutes";

// Version de l'API
const version = "v1";
const path = `/api/${version}`;

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Configurer Swagger
setupSwagger(app);

app.use(`${path}/beers`, beersRoutes);
app.use(`${path}/breweries`, breweriesRoutes);

export default app;

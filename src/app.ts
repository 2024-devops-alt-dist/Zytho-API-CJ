import express, { Application } from "express";
const app: Application = express();

import { setupSwagger } from "../swagger";

// Import des routes
import { router as beersRoutes } from "./routes/beersRoutes";
import { router as breweriesRoutes } from "./routes/breweriesRoutes";
import usersRoutes from "./routes/usersRoutes";
import detailsBeerRoutes from "./routes/detailsBeerRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import ingredientsRoutes from "./routes/ingredientsRoutes";
import picturesRoutes from "./routes/picturesRoutes";
import cors from 'cors';

// Version de l'API
const version = "v1";
const path = `/api/${version}`;

// Middleware pour autoriser les requêtes CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://zytho-front-cj.onrender.com', 'http://localhost:5173'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

app.use(`${path}/beers`, beersRoutes);
app.use(`${path}/breweries`, breweriesRoutes);
app.use(`${path}/users`, usersRoutes);
app.use(`${path}/details_beer`, detailsBeerRoutes);
app.use(`${path}/categories`, categoryRoutes);
app.use(`${path}/ingredients`, ingredientsRoutes);
app.use(`${path}/pictures`, picturesRoutes);

// Configurer Swagger
setupSwagger(app);

export default app;

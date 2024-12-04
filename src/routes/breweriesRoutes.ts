import { Router } from "express";
export const router = Router();

import { breweryController } from "../controllers/breweryControllers";

/**
 * @swagger
 * /breweries:
 *   get:
 *     summary: Récupérer toutes les brasseries
 *     tags:
 *       - Brewery
 *     responses:
 *       200:
 *         description: Liste des brasseries récupérées avec succès.
 */
router.get("/", breweryController.getAll);

/**
 * @swagger
 * /breweries/{id}:
 *   get:
 *     summary: Récupérer une brasserie par son ID
 *     tags:
 *       - Brewery
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la brasserie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brasserie trouvée.
 *       404:
 *         description: Brasserie introuvable.
 */
router.get('/:id', breweryController.getById);

/**
 * @swagger
 * /breweries:
 *   post:
 *     summary: Ajouter une nouvelle brasserie
 *     tags:
 *       - Brewery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *               schedules:
 *                 type: string
 *               url_social_media:
 *                 type: string
 *             required:
 *               - name
 *               - address
 *               - country
 *               - description
 *               - schedules
 *               - url_social_media
 *     responses:
 *       201:
 *         description: Brasserie ajoutée avec succès.
 *       400:
 *         description: Données invalides.
 */
router.post("/", breweryController.create); 

/**
 * @swagger
 * /breweries/{id}:
 *   put:
 *     summary: Mettre à jour une brasserie par son ID
 *     tags:
 *       - Brewery
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la brasserie à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *               schedules:
 *                 type: string
 *               url_social_media:
 *                 type: string
 *     responses:
 *       200:
 *         description: Brasserie mise à jour avec succès.
 *       400:
 *         description: Données invalides.
 *       404:
 *         description: Brasserie introuvable.
 */
router.put("/:id", breweryController.update); 

/**
 * @swagger
 * /breweries/{id}:
 *   delete:
 *     summary: Supprimer une brasserie par son ID
 *     tags:
 *       - Brewery
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la brasserie à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brasserie supprimée avec succès.
 *       404:
 *         description: Brasserie introuvable.
 */
router.delete("/:id", breweryController.delete); 


// router.delete("/", breweryController.deleteAll);

export default router;
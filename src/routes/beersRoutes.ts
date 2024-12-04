import { Router } from "express";
export const router = Router();

import { beersController } from "../controllers/beersController";

/**
 * @swagger
 * /beers:
 *   get:
 *     summary: Récupérer toutes les bières
 *     tags:
 *       - Beers
 *     responses:
 *       200:
 *         description: Liste des bières récupérée avec succès.
 */
router.get("/", beersController.getAll);

/**
 * @swagger
 * /beers/{id}:
 *   get:
 *     summary: Récupérer une bière par son ID
 *     tags:
 *       - Beers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la bière
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bière trouvée.
 *       404:
 *         description: Bière introuvable.
 */
router.get('/:id', beersController.getById);

/**
 * @swagger
 * /beers:
 *   post:
 *     summary: Ajouter une nouvelle bière
 *     tags:
 *       - Beers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               alcool_pourcent:
 *                 type: number
 *               details_beer_id:
 *                 type: number
 *               brewery_id:
 *                 type: number
 *             required:
 *               - name
 *               - type
 *               - alcool_pourcent
 *               - details_beer_id
 *               - brewery_id
 *     responses:
 *       201:
 *         description: Bière ajoutée avec succès.
 *       400:
 *         description: Données invalides.
 */
router.post("/", beersController.create);

/**
 * @swagger
 * /beers/{id}:
 *   put:
 *     summary: Mettre à jour une bière par son ID
 *     tags:
 *       - Beers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la bière à mettre à jour
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
 *               type:
 *                 type: string
 *               alcool_pourcent:
 *                 type: number
 *               details_beer_id:
 *                 type: number
 *               brewery_id:
 *                 type: number
 *     responses:
 *       200:
 *         description: Bière mise à jour avec succès.
 *       400:
 *         description: Données invalides.
 *       404:
 *         description: Bière non trouvée.
 */
router.put("/:id", beersController.update);

/**
 * @swagger
 * /beers/{id}:
 *   delete:
 *     summary: Supprimer une bière par son ID
 *     tags:
 *       - Beers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la bière à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bière supprimée avec succès.
 *       404:
 *         description: Bière non trouvée.
 */
router.delete("/:id", beersController.delete);

// /**
//  * @swagger
//  * /beers:
//  *   delete:
//  *     summary: Supprimer toutes les bières
//  *     tags:
//  *       - Beers
//  *     responses:
//  *       200:
//  *         description: Toutes les bières ont été supprimées.
//  *       500:
//  *         description: Une erreur s'est produite.
//  */
// router.delete("/", beersController.deleteAll);

export default router;

import { Router } from "express";
import { pictureController } from "../controllers/pictureController"; // Assurez-vous d'avoir le bon chemin d'import
export const router = Router();

/**
 * @swagger
 * /pictures:
 *   get:
 *     summary: Récupérer toutes les images
 *     tags:
 *       - Picture
 *     responses:
 *       200:
 *         description: Liste des images récupérée avec succès.
 */
router.get("/", pictureController.getAll);

/**
 * @swagger
 * /pictures/{id}:
 *   get:
 *     summary: Récupérer une image par son ID
 *     tags:
 *       - Picture
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'image
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image trouvée.
 *       404:
 *         description: Image introuvable.
 */
router.get('/:id', pictureController.getById);

/**
 * @swagger
 * /pictures:
 *   post:
 *     summary: Ajouter une nouvelle image
 *     tags:
 *       - Picture
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               is_principale:
 *                 type: boolean
 *             required:
 *               - url
 *     responses:
 *       201:
 *         description: Image ajoutée avec succès.
 */
router.post("/", pictureController.create);

/**
 * @swagger
 * /pictures/{id}:
 *   put:
 *     summary: Mettre à jour une image par son ID
 *     tags:
 *       - Picture
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'image à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               is_principale:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: L'image a été mise à jour avec succès.
 *       400:
 *         description: Données invalides.
 *       404:
 *         description: Image introuvable.
 */
router.put("/:id", pictureController.update);

/**
 * @swagger
 * /pictures/{id}:
 *   delete:
 *     summary: Supprimer une image par son ID
 *     tags:
 *       - Picture
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'image à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'image supprimée avec succès.
 *       404:
 *         description: L'image est introuvable.
 */
router.delete("/:id", pictureController.delete);

export default router;

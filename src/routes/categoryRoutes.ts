import { Router } from "express";
import { categoryController } from "../controllers/categoryController";
export const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès.
 */
router.get("/", categoryController.getAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie par son ID
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la catégorie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catégorie trouvée.
 *       404:
 *         description: Catégorie introuvable.
 */
router.get('/:id', categoryController.getById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Ajouter une nouvelle catégorie
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Catégorie ajoutée avec succès.
 */
router.post("/", categoryController.create);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Mettre à jour une catégorie par son ID
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la catégorie à mettre à jour
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
 *     responses:
 *       200:
 *         description: La catégorie a été mise à jour avec succès.
 *       400:
 *         description: Données invalides.
 *       404:
 *         description: Catégorie introuvable.
 */
router.put("/:id", categoryController.update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie par son ID
 *     description: ⚠️ Vous ne pouvez pas supprimer une catégorie si cette dernière est associée à une bière.
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la catégorie à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La catégorie supprimée avec succès.
 *       404:
 *         description: La catégorie est introuvable.
 */
router.delete("/:id", categoryController.delete);

export default router;
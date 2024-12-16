import { Router } from "express";
import { ingredientController } from "../controllers/ingredientController"; 
export const router = Router();

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Récupérer tous les ingrédients
 *     tags:
 *       - Ingredient
 *     responses:
 *       200:
 *         description: Liste des ingrédients récupérée avec succès.
 */
router.get("/", ingredientController.getAll);

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Récupérer un ingrédient par son ID
 *     tags:
 *       - Ingredient
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'ingrédient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingrédient trouvé.
 *       404:
 *         description: Ingrédient introuvable.
 */
router.get('/:id', ingredientController.getById);

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Ajouter un nouvel ingrédient
 *     tags:
 *       - Ingredient
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
 *         description: Ingrédient ajouté avec succès.
 */
router.post("/", ingredientController.create);

/**
 * @swagger
 * /ingredients/{id}:
 *   put:
 *     summary: Mettre à jour un ingrédient par son ID
 *     tags:
 *       - Ingredient
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'ingrédient à mettre à jour
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
 *         description: L'ingrédient a été mis à jour avec succès.
 *       400:
 *         description: Données invalides.
 *       404:
 *         description: Ingrédient introuvable.
 */
router.put("/:id", ingredientController.update);

/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     summary: Supprimer un ingrédient par son ID
 *     description: ⚠️ Vous ne pouvez pas supprimer un ingrédient si ce dernier est associée à une bière.
 *     tags:
 *       - Ingredient
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'ingrédient à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'ingrédient supprimé avec succès.
 *       404:
 *         description: L'ingrédient est introuvable.
 */
router.delete("/:id", ingredientController.delete);

export default router;

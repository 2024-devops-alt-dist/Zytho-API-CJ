import { Router } from "express";
import { detailsBeerController } from "../controllers/detailsBeerController";
export const router = Router();

/**
 * @swagger
 * /details_beer:
 *   get:
 *     summary: Récupérer toutes les fiches détails des bières
 *     tags:
 *       - DetailsBeer
 *     responses:
 *       200:
 *         description: Liste des détails des bières récupérée avec succès.
 */
router.get("/", detailsBeerController.getAll);

/**
 * @swagger
 * /details_beer/{id}:
 *   get:
 *     summary: Récupérer une fiche détail par son ID
 *     tags:
 *       - DetailsBeer
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la fiche détail
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fiche détail trouvé.
 *       404:
 *         description: Fiche détail introuvable.
 */
router.get('/:id', detailsBeerController.getById);

/**
 * @swagger
 * /details_beer:
 *   post:
 *     summary: Ajouter une nouvelle fiche détail
 *     tags:
 *       - DetailsBeer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               pays:
 *                 type: string
 *               amertume:
 *                 type: number
 *               douceur:
 *                 type: number
 *               fruite:
 *                 type: number
 *               fermentation:
 *                 type: string
 *               conditionnement:
 *                 type: string
 *               contenance:
 *                 type: number
 *               ibu:
 *                 type: number
 *               ebc:
 *                 type: number
 *             required:
 *               - description
 *               - color
 *               - pays
 *               - amertume
 *               - douceur
 *               - fruite
 *               - fermentation
 *               - conditionnement
 *               - contenance
 *               - ibu
 *               - ebc
 *     responses:
 *       201:
 *         description: Fiche détail ajoutée avec succès.
 */
router.post("/", detailsBeerController.create);

/**
 * @swagger
 * /details_beer/{id}:
 *   put:
 *     summary: Mettre à jour la fiche détail par son ID
 *     description: ⚠️ la valeur des propriétés "amertumes", "douceur" et "fruité" doit être compris entre 0 et 5.

 *     tags:
 *       - DetailsBeer
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la fiche détail à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               pays:
 *                 type: string
 *               amertume:
 *                 type: number
 *               douceur:
 *                 type: number
 *               fruite:
 *                 type: number
 *               fermentation:
 *                 type: string
 *               conditionnement:
 *                 type: string
 *               contenance:
 *                 type: number
 *               ibu:
 *                 type: number
 *               ebc:
 *                 type: number
 *     responses:
 *       200:
 *         description: La fiche détail a été mise à jour avec succès.
 *       400:
 *         description: Données invalides.
 *       404:
 *         description: Fiche détail introuvable.
 */
router.put("/:id", detailsBeerController.update);

/**
 * @swagger
 * /details_beer/{id}:
 *   delete:
 *     summary: Supprimer la fiche détail par son ID
 *     description: ⚠️ supprimer la fiche detail supprimera aussi la bière associé à cette dernière.
 *     tags:
 *       - DetailsBeer
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la fiche détail à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La fiche détail supprimée avec succès.
 *       404:
 *         description: La fiche détail est introuvable.
 */
router.delete("/:id", detailsBeerController.delete);

export default router;
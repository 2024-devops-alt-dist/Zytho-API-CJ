import { Request, Response } from "express";
import { pool } from "../data/config";
import { DetailsBeer } from "../models/details_beer";

export const detailsBeerController = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await pool.query("SELECT * FROM details_beer");
            if (result.rows.length === 0) {
                res.status(404).json({ error: "Aucunes fiches détails trouvée." });
                return; 
            }
            res.status(200).json({ details_beer: result.rows });
        } catch (error) {
            console.error("Erreur lors de la récupération des fiches détails.", error);
            res.status(500).json({ error: "Erreur lors de la récupération des fiches détails." });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const result = await pool.query("SELECT * FROM details_beer WHERE id = $1", [id]);

            if (result.rows.length === 0) {
                res.status(404).json({ error: `La fiche détail avec l'ID ${id} est introuvable` });
                return;
            }

            res.status(200).json({ details_beer: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la récupération de la fiche détail ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    create: async (req: Request, res: Response): Promise<void> => {
        const {
            description,
            color,
            pays,
            amertume,
            douceur,
            fruite,
            fermentation,
            conditionnement,
            contenance,
            ibu,
            ebc
        }: DetailsBeer = req.body;

        // Vérification des données nécessaires
        if (!color || !pays || !fermentation || !conditionnement || !contenance || !ibu || !ebc) {
            res.status(400).json({ error: "Tous les champs sont requis." });
            return;
        }
    
        try {
            // Requête SQL correcte pour insérer une nouvelle fiche détail
            const result = await pool.query(
                `INSERT INTO details_beer (description, color, pays, amertume, douceur, fruite, fermentation, conditionnement, contenance, ibu, ebc)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *`,
                [description, color, pays, amertume, douceur, fruite, fermentation, conditionnement, contenance, ibu, ebc]
            );
    
            // Retourner la fiche détail créée avec son id généré
            res.status(201).json({ details_beer: result.rows[0] });
        } catch (error) {
            console.error("Erreur lors de la création de la fiche détail.", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const {
            description,
            color,
            pays,
            amertume,
            douceur,
            fruite,
            fermentation,
            conditionnement,
            contenance,
            ibu,
            ebc
        }: DetailsBeer = req.body;

        try {
            // Vérification si la fiche détail existe
            const detailsBeerExists  = await pool.query("SELECT * FROM details_beer WHERE id = $1", [id]);
            if (detailsBeerExists .rows.length === 0) {
                res.status(404).json({ error: `La fiche détail avec l'id ${id} est introuvable.` });
                return;
            }

            // Mise à jour de la fiche détail
            const result = await pool.query(
                `UPDATE details_beer
                SET 
                    description = COALESCE($1, description),
                    color = COALESCE($2, color),
                    pays = COALESCE($3, pays),
                    amertume = COALESCE($4, amertume),
                    douceur = COALESCE($5, douceur),
                    fruite = COALESCE($6, fruite),
                    fermentation = COALESCE($7, fermentation),
                    conditionnement = COALESCE($8, conditionnement),
                    contenance = COALESCE($9, contenance),
                    ibu = COALESCE($10, ibu),
                    ebc = COALESCE($11, ebc)
                WHERE id = $12
                RETURNING *`,
                [description, color, pays, amertume, douceur, fruite, fermentation, conditionnement, contenance, ibu, ebc, id]
            );

            res.status(200).json({ details_beer: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la fiche détail ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
    
        try {
            // Vérification si la fiche détail existe
            const detailsBeerExists  = await pool.query("SELECT * FROM details_beer WHERE id = $1", [id]);
            if (detailsBeerExists .rows.length === 0) {
                res.status(404).json({ error: `La fiche détail avec l'ID ${id} est introuvable.` });
                return;
            }
    
            // Suppression de la fiche détail
            await pool.query("DELETE FROM details_beer WHERE id = $1", [id]);
    
            res.status(200).json({ message: `La fiche détail avec l'ID ${id} supprimé avec succès.` });
        } catch (error) {
            console.error(`Erreur lors de la suppression de la fiche détail ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },
};
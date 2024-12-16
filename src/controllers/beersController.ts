import { Request, Response } from "express";
import { pool } from "../data/config";
import { Beer } from "../models/beer";

export const beersController = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await pool.query("SELECT * FROM beer");
            if (result.rows.length === 0) {
                res.status(404).json({ error: "Aucune bière trouvée." });
                return; 
            }
            res.status(200).json({ beers: result.rows });
        } catch (error) {
            console.error("Erreur lors de la récupération des bières.", error);
            res.status(500).json({ error: "Erreur lors de la récupération des bières." });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const result = await pool.query("SELECT * FROM beer WHERE id = $1", [id]);

            if (result.rows.length === 0) {
                res.status(404).json({ error: `Bière avec l'ID ${id} introuvable` });
                return;
            }

            res.status(200).json({ beer: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la récupération de la bière ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    create: async (req: Request, res: Response): Promise<void> => {
        const { name, type, alcool_pourcent, details_beer_id, brewery_id }: Beer = req.body;
    
        // Vérification des données nécessaires
        if (!name || !type || !alcool_pourcent || !details_beer_id || !brewery_id) {
            res.status(400).json({ error: "Tous les champs sont requis." });
            return;
        }
    
        try {
            // Requête SQL correcte pour insérer une nouvelle bière
            const result = await pool.query(
                `INSERT INTO beer (name, type, alcool_pourcent, details_beer_id, brewery_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`, 
                [name, type, alcool_pourcent, details_beer_id, brewery_id]
            );
    
            // Retourner la bière créée avec son id généré
            res.status(201).json({ beer: result.rows[0] });
        } catch (error) {
            console.error("Erreur lors de la création de la bière.", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name, type, alcool_pourcent, details_beer_id, brewery_id }: Partial<Beer> = req.body;

        try {
            // Vérification si la bière existe
            const beerExists = await pool.query("SELECT * FROM beer WHERE id = $1", [id]);
            if (beerExists.rows.length === 0) {
                res.status(404).json({ error: `Bière avec l'ID ${id} introuvable` });
                return;
            }

            // Mise à jour de la bière
            const result = await pool.query(
                `UPDATE beer 
                SET 
                    name = COALESCE($1, name), 
                    type = COALESCE($2, type), 
                    alcool_pourcent = COALESCE($3, alcool_pourcent), 
                    details_beer_id = COALESCE($4, details_beer_id), 
                    brewery_id = COALESCE($5, brewery_id)
                WHERE id = $6
                RETURNING *`,
                [name, type, alcool_pourcent, details_beer_id, brewery_id, id]
            );

            res.status(200).json({ beer: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la bière ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
    
        try {
            // Vérification si la bière existe
            const beerExists = await pool.query("SELECT * FROM beer WHERE id = $1", [id]);
            if (beerExists.rows.length === 0) {
                res.status(404).json({ error: `Bière avec l'ID ${id} introuvable.` });
                return;
            }

            // Suppression de la bière
            await pool.query("DELETE FROM beer WHERE id = $1", [id]);
    
            res.status(200).json({ message: `Bière avec l'ID ${id} supprimée avec succès.` });
        } catch (error) {
            console.error(`Erreur lors de la suppression de la bière ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },

    // deleteAll: async (req: Request, res: Response): Promise<void> => {
    //     try {
    //         // Suppression de toutes les bières
    //         await pool.query("DELETE FROM beer");
    
    //         res.status(200).json({ message: "Toutes les bières ont été supprimées avec succès." });
    //     } catch (error) {
    //         console.error("Erreur lors de la suppression de toutes les bières.", error);
    //         res.status(500).json({ error: "Erreur interne du serveur." });
    //     }
    // }
    
};


import { Request, Response } from "express";
import { pool } from "../data/config";
import { Picture } from "../models/picture";

export const pictureController = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await pool.query("SELECT * FROM picture");
            if (result.rows.length === 0) {
                res.status(404).json({ error: "Aucune image trouvée." });
                return;
            }
            res.status(200).json({ pictures: result.rows });
        } catch (error) {
            console.error("Erreur lors de la récupération des images.", error);
            res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const result = await pool.query("SELECT * FROM picture WHERE id = $1", [id]);

            if (result.rows.length === 0) {
                res.status(404).json({ error: `L'image avec l'ID ${id} est introuvable` });
                return;
            }

            res.status(200).json({ picture: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'image ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    create: async (req: Request, res: Response): Promise<void> => {
        const { url, is_principale }: { url: string, is_principale: boolean } = req.body;

        // Vérification des données nécessaires
        if (!url) {
            res.status(400).json({ error: "L'URL de l'image est requise." });
            return;
        }

        try {
            // Insertion dans la base de données
            const result = await pool.query(
                `INSERT INTO picture (url, is_principale)
                VALUES ($1, $2) RETURNING *`,
                [url, is_principale]
            );

            // Retourne l'image créée avec son ID
            res.status(201).json({ picture: result.rows[0] });
        } catch (error) {
            console.error("Erreur lors de la création de l'image.", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { url, is_principale }: Picture = req.body;

        if (!url) {
            res.status(400).json({ error: "L'URL/nom de l'image'est requis." });
            return;
        }

        try {
            // Vérification si l'image existe
            const pictureExists = await pool.query("SELECT * FROM picture WHERE id = $1", [id]);
            if (pictureExists.rows.length === 0) {
                res.status(404).json({ error: `L'image avec l'ID ${id} est introuvable.` });
                return;
            }

            // Mise à jour de l'image
            const result = await pool.query(
                `UPDATE picture
                SET url = COALESCE($1, url), is_principale = COALESCE($2, is_principale)
                WHERE id = $3
                RETURNING *`,
                [url, is_principale, id]
            );

            res.status(200).json({ picture: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de l'image ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            // Vérification si l'image existe
            const pictureExists = await pool.query("SELECT * FROM picture WHERE id = $1", [id]);
            if (pictureExists.rows.length === 0) {
                res.status(404).json({ error: `L'image avec l'ID ${id} est introuvable.` });
                return;
            }

            // Suppression de l'image
            await pool.query("DELETE FROM picture WHERE id = $1", [id]);

            res.status(200).json({ message: `L'image avec l'ID ${id} supprimée avec succès.` });
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'image ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },
};

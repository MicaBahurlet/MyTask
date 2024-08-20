

import { Router } from "express";
import { pool } from "../db.js";
import authRoutes from "./auth.routes.js"; 

const router = Router();

// Ruta de prueba (ping)
router.get('/ping', async (req, res) => {
    const [rows] = await pool.query("SELECT 1 + 1 as result");
    console.log(rows);
    res.json(rows);
});

// Rutas de autenticación
router.use("/auth", authRoutes);

export default router;

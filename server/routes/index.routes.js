

import { Router } from "express";
import { pool } from "../db.js";
import authRoutes from "./auth.routes.js"; 
import tasksRoutes from "./tasks.routes.js";

const router = Router();

// ruta de prueba (ping)
router.get('/ping', async (req, res) => {
    const [rows] = await pool.query("SELECT 1 + 1 as result");
    console.log(rows);
    res.json(rows);
});

// rutas de autenticación
router.use("/auth", authRoutes);


export default router;

import { Router } from "express";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
import { pool } from "../db.js"; 

const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
            username,
            email,
            hashedPassword
        ]);

        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error(error); // error
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// Ruta para login de usuario
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ userId: user[0].id }, "tu_secreto_jwt", { expiresIn: "1h" });

        res.json({ token, message: "Inicio de sesión exitoso" });
    } catch (error) {
        console.error(error); // error
        res.status(500).json({ message: "Error en el servidor" });
    }
});

export default router;

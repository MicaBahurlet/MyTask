import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from "../server/db.js";

// Registrar un nuevo usuario

export const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // verifico si el usuario ya existe
      const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }
  
      // cifro contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // nuevo usuario en la base de datos
      await pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
  
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      console.error(error); // error de registro
      res.status(500).json({ message: error.message });
    }
};
  


// Iniciar sesión 
export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // busci el usuario en la base de datos
      const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
  
      if (users.length === 0) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }
  
      const user = users[0];
  
      // comparo contraseña nueva con la almacenada
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }
  
      //  token JWT
      const token = jwt.sign({ userId: user.id }, 'tu_clave_secreta', { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

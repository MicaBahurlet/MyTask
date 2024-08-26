import { pool } from "../server/db.js";
import jwt from "jsonwebtoken"; 
export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      req.params.id,
    ]); //selecciona todas las tareas en las que coincida el id que te estoy pasando en la querry
  
    if (result.length === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
  
    res.json(result[0]); // quiero que solo me devuelva el primero del array
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, token } = req.body; //to do: sacar token del body y obtenerlo del header 
    const decoded = jwt.verify(token, "tu_secreto_jwt"); 
    const user_id = decoded.userId;

    const [result] = await pool.query(
      "INSERT INTO tasks(title, description, user_id) VALUES (?, ?, ?)",
      [title, description, user_id]
    );
    console.log(result);
    res.json({ id: result.insertId, title, description });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteTasks = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
      req.params.id,
    ]);
  
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
  
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

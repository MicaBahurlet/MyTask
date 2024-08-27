import { pool } from "../server/db.js";
import jwt from "jsonwebtoken"; 


export const getTasks = async (req, res) => {
  try {
    const userId = req.user.userId; // solo quiero que traiga las del usuario logueado

      //solo traeme todo del usuario logueado y ordenala por la fecha
    const [result] = await pool.query(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY createAt DESC",  //lo ordeno para que quede la más reciente primero, sino cambiar por ASC
      [userId] //uso el id que extraje del token
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
    const { title, description } = req.body; //para poder eliminar el token del body
    const userId = req.user.userId; //me traigo el id del usuario

    const [result] = await pool.query(
      "INSERT INTO tasks(title, description, user_id) VALUES (?, ?, ?)",
      [title, description, userId]
    );
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

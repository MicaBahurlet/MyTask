import { pool } from "../server/db.js";

export const getTasks = (req, res) => {
  res.send("Obteniendo tareas");
};
export const getTask = (req, res) => {
  res.send("obteniendo tarea");
};
//Tipié mal en la creación de la tabla, es tittle. title no existe.
export const createTask = async (req, res) => {
  const { tittle, description } = req.body;
  const [result] = await pool.query(
    "INSERT INTO tasks(tittle, description) VALUES (?, ?)",
    [tittle, description]
  );
  console.log(result);
  res.json({ id: result.insertId, tittle, description });
};
export const updateTasks = (req, res) => {
  res.send("Actualizando tarea");
};
export const deleteTasks = (req, res) => {
  res.send("Eliminando tarea");
};

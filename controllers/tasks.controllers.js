import { pool } from "../server/db.js";

export const getTasks = async (req, res) => {
  const [result] = await pool.query(
    "SELECT * FROM tasks ORDER BY createAt ASC"
  );
  console.log(result);
  res.json(result);
};

export const getTask = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
    req.params.id,
  ]); //selecciona todas las tareas en las que coincida el id que te estoy pasando en la querry

  if (result.length === 0) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  res.json(result[0]); // quiero que solo me devuelva el primero del array
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
export const updateTask = async (req, res) => {
  const result = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
    req.body,
    req.params.id,
  ]);
  res.json(result);





};
export const deleteTasks = async (req, res) => {
  const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
    req.params.id,
  ]);
  
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  return res.sendStatus(204);
};

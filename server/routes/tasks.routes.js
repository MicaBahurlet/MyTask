

import { Router } from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTasks
} from "../../controllers/tasks.controllers.js";
import { authenticateToken } from "../middleware/auth.js"; 

const router = Router();

router.use(authenticateToken); //  middleware a todas las rutas aquí

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTasks);

export default router;



import express from "express";
import cors from "cors";
import { PORT } from "./server/config.js";

import indexRoutes from "./server/routes/index.routes.js";
import taskRoutes from "./server/routes/tasks.routes.js";
import authRoutes from "./server/routes/auth.routes.js"; 

const app = express();

app.use(cors());
app.use(express.json()); // para que los datos que lleguen en formato JSON


app.get("/", (req, res) => {
    res.send("MyTask API");
});

app.use(indexRoutes);
app.use(authRoutes); // rutas de autenticación de usuario
app.use(taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import express from "express";
import { PORT } from "./server/config.js";

import indexRoutes from "./server/routes/index.routes.js";
import taskRoutes from "./server/routes/tasks.routes.js";

const app = express();

app.use(indexRoutes);
app.use(taskRoutes);
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

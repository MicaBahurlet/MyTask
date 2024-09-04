import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Mytask1",
    port: 3306,
    database: "tasksdb"
});



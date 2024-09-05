
// export const PORT = 8080;

export const PORT = process.env.PORT || 8080 // para el puerto que me de el servidor

//para evitar que en produccion se sepan estos datos

export const DB_HOST = process.env.DB_HOST || "localhost" // para la base de datos
export const DB_USER = process.env.DB_USER || "root"
export const DB_PASSWORD = process.env.DB_PASSWORD || "Mytask1"
export const DB_NAME = process.env.DB_NAME || "tasksdb"
export const DB_PORT = process.env.DB_PORT || "3306"
//import { url } from "inspector";

// port
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafestable';
} else {
    urlDB = process.env.MONGODB;

}

// Token 
process.env.TOKEN_CAD = 60 * 60 * 24 * 30;

// Token Seed 
process.env.TOKEN_SEED = process.env.TOKEN_SEED || "mi-clave-secreta";

process.env.URLDB = urlDB;
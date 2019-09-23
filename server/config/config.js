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
    urlDB = 'mongodb+srv://dev:jted1990@cluster0-z5ixd.mongodb.net/cafe?retryWrites=true&w=majority'

}

process.env.URLDB = urlDB;
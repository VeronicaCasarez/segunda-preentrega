import express from 'express';
import mongoose from 'mongoose';
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import * as dotenv from "dotenv";

import cartRouter from './routes/cart.router.js';
import messageRouter from './routes/message.router.js';
import productRouter from './routes/product.router.js';


// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Configurar el puerto
const PORT = process.env.PORT || 8080;

//Configuracion para handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static("public"));

// Configurar la conexión a MongoDB usando las variables de entorno
const MONGO_URI = process.env.MONGO_URI;

let dbConnect = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbConnect.then(
  () => {
    console.log("Conexión a la base de datos exitosa");
  },
  (error) => {
    console.log("Error en la conexión a la base de datos", error);
  }
);

// Middleware para procesar los datos del formulario y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar las rutas
app.use('/api/carts', cartRouter);
app.use('/api/messages', messageRouter);
app.use('/api/products', productRouter);


// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido a mi e-commerce');
});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

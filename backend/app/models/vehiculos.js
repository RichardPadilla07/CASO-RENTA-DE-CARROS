// Modelo para la gestión de productos.
// Aquí se define la estructura y configuración para la tabla de productos en la base de datos.
// Puedes modificar la estructura, nombres de campos o lógica según la temática o cambios futuros en el proyecto.

import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  marca: { type: String, required: true, maxlength: 20 },
  modelo: { type: String, required: true, unique: true, maxlength: 20 },
  anio_fabricacion: { type: Date },
  placa: { type: String, maxlength: 7 },
  color: { type: String },
  tipo: { type: String },
  kilometraje: { type: String },
  descripcion: { type: String, maxlength: 20 }
});

const Producto = mongoose.model("Vehiculo", productoSchema);

export default Producto;
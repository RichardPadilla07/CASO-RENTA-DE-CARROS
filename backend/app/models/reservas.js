// Modelo para la gestión de pedidos.
// Aquí se define la estructura y configuración para la tabla de pedidos en la base de datos.
// Puedes modificar la estructura, nombres de campos o lógica según la temática o cambios futuros en el proyecto.

import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  codigo: { type: Number, required: true, unique: true },
  descripcion: { type: Number, required: true },
  id_cliente: { type: String, required: true, maxlength: 20 },
  id_vehiculo: { type: Number, required: true, default: 1 },
  estado: { type: String, enum: ['pendiente', 'reserva aceptada', 'no disponible', 'reserva eliminada'], default: 'pendiente' }
});

const Pedido = mongoose.model("Reserva", pedidoSchema);

export default Pedido;
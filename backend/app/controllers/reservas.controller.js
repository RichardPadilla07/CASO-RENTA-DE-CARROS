// Controlador para la gestión de pedidos.
// Aquí se definen las funciones que manejan las operaciones CRUD y consultas relacionadas con pedidos.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

import Pedido from '../models/reservas.js';
import Producto from '../models/vehiculos.js';
import Cliente from '../models/cliente.js';

export const getByCliente = async (req, res) => {
  try {
    const { cedula } = req.params;
    const pedidos = await Pedido.find({ cedula_cliente: cedula });
    // Para cada pedido, buscar el producto y agregar sus datos
    const pedidosConProducto = await Promise.all(pedidos.map(async (pedido) => {
      const producto = await Producto.findOne({ codigo: pedido.codigo_producto });
      return {
        ...pedido.toObject(),
        nombre: producto ? producto.nombre : '',
        categoria: producto ? producto.categoria : '',
        precio: producto ? producto.precio : '',
        stock: producto ? producto.stock : ''
      };
    }));
    res.json(pedidosConProducto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los pedidos
export const getAll = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo pedido
export const create = async (req, res) => {
  try {
    const { codigo_pedido, cedula_cliente, codigo_producto, cantidad } = req.body;
    // Validar existencia de cliente y producto
    const cliente = await Cliente.findOne({ cedula: cedula_cliente });
    if (!cliente) return res.status(400).json({ error: 'Cédula de cliente no existe' });
    const producto = await Producto.findOne({ codigo: codigo_producto });
    if (!producto) return res.status(400).json({ error: 'Código de producto no existe' });
    if (cantidad > producto.stock) return res.status(400).json({ error: 'Cantidad supera el stock disponible' });
    const pedido = new Pedido({ codigo_pedido, cedula_cliente, codigo_producto, cantidad, estado: 'pendiente' });
    await pedido.save();
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un pedido
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByIdAndUpdate(id, req.body, { new: true });
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un pedido
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByIdAndDelete(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json({ message: 'Pedido eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rutas para la gestión de productos.
// Aquí se definen los endpoints que permiten interactuar con los productos mediante el controlador correspondiente.
// Puedes modificar las rutas, nombres o lógica según la temática o cambios futuros en el proyecto.

// Importar las dependencias necesarias
import { Router } from 'express';
import { getAll, getByCodigo, getById, create, update, remove } from '../controllers/vehiculo.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/codigo/:codigo', getByCodigo);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;

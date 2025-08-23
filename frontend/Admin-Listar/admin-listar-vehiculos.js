// Script para la gestión y listado de productos en el panel de administración.
// Aquí se definen funciones para el CRUD y visualización de productos.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.
// CRUD de productos para el panel admin
const API_URL = 'http://localhost:3000/api/productos';

async function cargarProductos() {
  const tbody = document.getElementById('tabla-productos-body');
  tbody.innerHTML = '';
  try {
    const res = await fetch(API_URL);
    const productos = await res.json();
    productos.forEach((prod, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${prod.marca}</td>
        <td>${prod.modelo}</td>
        <td>${prod.anio_fabricacion ? new Date(prod.anio_fabricacion).toISOString().slice(0, 10) : ''}</td>
        <td>${prod.placa}</td>
        <td>${prod.color}</td>
        <td>${prod.tipo}</td>
        <td>${prod.kilometraje}</td>
        <td>${prod.descripcion || ''}</td>
        <td style="display:flex;gap:8px;justify-content:center;align-items:center;">
          <button onclick="editarProducto('${prod._id}')">✏️</button>
          <button onclick="eliminarProducto('${prod._id}')">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="10">Error al cargar productos</td></tr>';
  }
}

async function handleCrearProducto(e) {
  e.preventDefault();
  const form = e.target;
  const datos = {
    marca: form.marca.value.trim(),
    modelo: form.modelo.value.trim(),
    anio_fabricacion: form.anio_fabricacion.value,
    placa: form.placa.value.trim(),
    color: form.color.value.trim(),
    tipo: form.tipo.value.trim(),
    kilometraje: form.kilometraje.value.trim(),
    descripcion: form.descripcion.value.trim()
  };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    if (res.ok) {
      form.reset();
      cargarProductos();
      alert('Producto creado correctamente');
    } else {
      alert('Error al crear producto');
    }
  } catch (err) {
    alert('Error de conexión');
  }
}

window.eliminarProducto = async function(id) {
  if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) cargarProductos();
    else alert('Error al eliminar producto');
  } catch (err) {
    alert('Error de conexión');
  }
}

window.editarProducto = async function(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return alert('No se pudo obtener el producto');
    const prod = await res.json();
    const modal = document.getElementById('modal-editar-producto');
    const form = document.getElementById('form-editar-producto');
    form.marca.value = prod.marca || '';
    form.modelo.value = prod.modelo || '';
    form.anio_fabricacion.value = prod.anio_fabricacion || '';
    form.placa.value = prod.placa || '';
    form.color.value = prod.color || '';
    form.tipo.value = prod.tipo || '';
    form.kilometraje.value = prod.kilometraje || '';
    form.descripcion.value = prod.descripcion || '';
    modal.style.display = 'flex';
    form.onsubmit = async function(e) {
      e.preventDefault();
      const datos = {
        marca: form.marca.value.trim(),
        modelo: form.modelo.value.trim(),
        anio_fabricacion: form.anio_fabricacion.value,
        placa: form.placa.value.trim(),
        color: form.color.value.trim(),
        tipo: form.tipo.value.trim(),
        kilometraje: form.kilometraje.value.trim(),
        descripcion: form.descripcion.value.trim()
      };
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        if (res.ok) {
          modal.style.display = 'none';
          cargarProductos();
          alert('Producto actualizado correctamente');
        } else {
          alert('Error al actualizar producto');
        }
      } catch (err) {
        alert('Error de conexión');
      }
    };
    document.getElementById('btn-cerrar-modal-editar').onclick = () => {
      modal.style.display = 'none';
    };
  } catch (err) {
    alert('Error de conexión');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  const formProducto = document.getElementById('form-producto');
  if (formProducto) formProducto.onsubmit = handleCrearProducto;
});
// Script para la gestión y listado de productos en el panel de administración.
// Aquí se definen funciones para el CRUD y visualización de productos.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.
// CRUD de productos para el panel admin
const API_URL = 'http://localhost:3000/api/vehiculos';

async function cargarProductos() {
  const tbody = document.getElementById('tabla-productos-body');
  tbody.innerHTML = '';
  try {
    const res = await fetch(API_URL);
    const vehiculos = await res.json();
    vehiculos.forEach((vehiculo, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${vehiculo.marca}</td>
        <td>${vehiculo.modelo}</td>
        <td>${vehiculo.anio_fabricacion ? vehiculo.anio_fabricacion.substring(0,10) : ''}</td>
        <td>${vehiculo.placa || ''}</td>
        <td>${vehiculo.color || ''}</td>
        <td>${vehiculo.tipo || ''}</td>
        <td>${vehiculo.kilometraje || ''}</td>
        <td>${vehiculo.descripcion || ''}</td>
        <td style="display:flex;gap:8px;justify-content:center;align-items:center;">
          <button onclick="editarVehiculo('${vehiculo._id}')">✏️</button>
          <button onclick="eliminarVehiculo('${vehiculo._id}')">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="10">Error al cargar vehículos</td></tr>';
  }
}

async function handleCrearProducto(e) {
  e.preventDefault();
  const form = e.target;
  const vehiculo = {
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
      body: JSON.stringify(vehiculo)
    });
    if (res.ok) {
      form.reset();
      cargarProductos();
      alert('Vehículo creado correctamente');
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

window.editarVehiculo = async function(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return alert('No se pudo obtener el vehículo');
    const vehiculo = await res.json();
    const modal = document.getElementById('modal-editar-vehiculo');
    const form = document.getElementById('form-editar-vehiculo');
    form.marca.value = vehiculo.marca || '';
    form.modelo.value = vehiculo.modelo || '';
    form.anio_fabricacion.value = vehiculo.anio_fabricacion || '';
    form.placa.value = vehiculo.placa || '';
    form.color.value = vehiculo.color || '';
    form.tipo.value = vehiculo.tipo || '';
    form.kilometraje.value = vehiculo.kilometraje || '';
    form.descripcion.value = vehiculo.descripcion || '';
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

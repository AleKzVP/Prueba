document.addEventListener('DOMContentLoaded', () => {
    fetchProductos();
});

function fetchProductos() {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            const productoSelect = document.getElementById('producto');
            data.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.name;
                option.textContent = producto.name;
                productoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching productos:', error));
}

function generarFactura() {
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const direccion = document.getElementById('direccion').value;
    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
    const total = (cantidad * precio).toFixed(2);

    const detallesFactura = `
        <p class="facturaItem"><strong>Nombre del Cliente:</strong> ${nombre}</p>
        <p class="facturaItem"><strong>Correo Electrónico:</strong> ${correo}</p>
        <p class="facturaItem"><strong>Dirección:</strong> ${direccion}</p>
        <p class="facturaItem"><strong>Producto:</strong> ${producto}</p>
        <p class="facturaItem"><strong>Cantidad:</strong> ${cantidad}</p>
        <p class="facturaItem"><strong>Precio Unitario:</strong> $${precio}</p>
        <p class="facturaItem"><strong>Total:</strong> $${total}</p>
    `;

    document.getElementById('detallesFactura').innerHTML = detallesFactura;
    document.getElementById('factura').style.display = 'block';
}

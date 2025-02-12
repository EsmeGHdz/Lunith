document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        let total = 0;
        carrito.forEach((producto, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>
                    <button onclick="cambiarCantidad(${index}, -1)">-</button>
                    ${producto.cantidad}
                    <button onclick="cambiarCantidad(${index}, 1)">+</button>
                </td>
                <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
            `;
            listaCarrito.appendChild(fila);
            total += producto.precio * producto.cantidad;
        });
        totalElemento.textContent = total.toFixed(2);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    window.agregarProducto = (nombre, precio) => {
        const productoExistente = carrito.find(p => p.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }
        actualizarCarrito();
    };

    window.cambiarCantidad = (index, cantidad) => {
        carrito[index].cantidad += cantidad;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
    };

    window.eliminarProducto = (index) => {
        carrito.splice(index, 1);
        actualizarCarrito();
    };

    actualizarCarrito();
});

let carrito = [];

const botones = document.querySelectorAll(".comprar");
const contador = document.getElementById("contador");
const listaCarrito = document.getElementById("listaCarrito");
const totalTexto = document.getElementById("total");
const carritoBox = document.getElementById("carrito");
const verCarrito = document.getElementById("verCarrito");
const botonPedido = document.getElementById("pedido");
const buscador = document.getElementById("buscador");


// Añadir productos al carrito
botones.forEach(boton => {

    boton.addEventListener("click", () => {

        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        const productoExistente = carrito.find(
            producto => producto.nombre === nombre
        );

        if(productoExistente){
            productoExistente.cantidad++;
        } else {
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        actualizarCarrito();

    });

});


// Mostrar carrito
verCarrito.addEventListener("click", () => {

    if (carritoBox.classList.contains("oculto")) {
        carritoBox.classList.remove("oculto");
    } else {
        carritoBox.classList.add("oculto");
    }

});


// Actualizar carrito
function actualizarCarrito(){

    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;


    carrito.forEach((producto, indice) => {

        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;


        const linea = document.createElement("div");

        linea.innerHTML = `
        <span>
        ${producto.nombre} 
        x${producto.cantidad}
        </span>

        <span>
        ${producto.precio * producto.cantidad} €
        <button onclick="eliminarProducto(${indice})">
        ❌
        </button>
        </span>
        `;


        listaCarrito.appendChild(linea);

    });


    contador.textContent = cantidadTotal;
    totalTexto.textContent = total;

}


// Eliminar producto
function eliminarProducto(indice){

    carrito.splice(indice,1);

    actualizarCarrito();

}


// Buscador
buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase();

    const productos = document.querySelectorAll(".producto");


    productos.forEach(producto => {

        const nombre = producto
        .querySelector("h2")
        .textContent
        .toLowerCase();


        if(nombre.includes(texto)){
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }

    });

});


// Preparar pedido
botonPedido.addEventListener("click", () => {

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const formaPago = document.getElementById("pago").value;

    const resumen = document.getElementById("resumenPedido");
    const confirmacion = document.getElementById("confirmacion");

    let texto = "<h3>Tu pedido:</h3>";

    carrito.forEach(producto => {
        texto += `
        <p>
        ${producto.nombre} x${producto.cantidad}
        - ${producto.precio * producto.cantidad} €
        </p>`;
    });

    texto += `
    <hr>
    <p>Total: ${totalTexto.textContent} €</p>
    <p>Pago elegido: ${formaPago}</p>
    `;

    resumen.innerHTML = texto;

    confirmacion.classList.remove("oculto");

});

const confirmarPedido = document.getElementById("confirmarPedido");

confirmarPedido.addEventListener("click", () => {

    let mensaje = "Hola, quiero hacer este pedido:\n\n";

    carrito.forEach(producto => {

        mensaje += producto.nombre + 
        " x" + producto.cantidad + 
        " - " + 
        (producto.precio * producto.cantidad) + "€\n";

    });

    mensaje += "\nTotal: " + totalTexto.textContent + "€";


    const texto = encodeURIComponent(mensaje);

    window.open(
    "https://wa.me/34633043371?text=" + texto,
    "_blank"
);

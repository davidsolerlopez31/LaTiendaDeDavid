// ======================================
// LA TIENDA DE DAVID
// ======================================

// Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos
const contador = document.getElementById("contador");
const listaCarrito = document.getElementById("listaCarrito");
const totalTexto = document.getElementById("total");

const carritoBox = document.getElementById("carrito");
const botonCarrito = document.getElementById("verCarrito");

const botonesComprar = document.querySelectorAll(".comprar");

// Cargar al iniciar
document.addEventListener("DOMContentLoaded", () => {

    actualizarCarrito();

});

// Abrir / cerrar carrito
botonCarrito.addEventListener("click", () => {

    carritoBox.classList.toggle("oculto");

});

// Añadir productos
botonesComprar.forEach(boton => {

    boton.addEventListener("click", () => {

        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        const existe = carrito.find(p => p.nombre === nombre);

        if (existe) {

            existe.cantidad++;

        } else {

            carrito.push({
                nombre,
                precio,
                cantidad: 1
            });

        }

        guardarCarrito();
        actualizarCarrito();

    });

});

// Guardar carrito
function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}

// Actualizar carrito
function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidad = 0;

    carrito.forEach((producto, index) => {

        total += producto.precio * producto.cantidad;
        cantidad += producto.cantidad;

        listaCarrito.innerHTML += `
        <div>
            <span>
                ${producto.nombre}
                x${producto.cantidad}
            </span>

            <button
                onclick="eliminarProducto(${index})">
                ❌
            </button>
        </div>
        `;

    });

    contador.textContent = cantidad;
    totalTexto.textContent = total.toFixed(2);

}

// ======================================
// ELIMINAR PRODUCTO
// ======================================

function eliminarProducto(index){

    carrito.splice(index,1);

    guardarCarrito();

    actualizarCarrito();

}

// ======================================
// VACIAR CARRITO
// ======================================

const botonVaciar = document.getElementById("vaciarCarrito");

botonVaciar.addEventListener("click",()=>{

    if(confirm("¿Vaciar todo el carrito?")){

        carrito=[];

        guardarCarrito();

        actualizarCarrito();

    }

});

// ======================================
// BUSCADOR
// ======================================

const buscador = document.getElementById("buscador");

buscador.addEventListener("input",()=>{

    const texto=buscador.value.toLowerCase();

    document.querySelectorAll(".producto").forEach(producto=>{

        const nombre=producto.querySelector("h2")
        .textContent
        .toLowerCase();

        producto.style.display=
        nombre.includes(texto)
        ? "block"
        : "none";

    });

});

// ======================================
// CATEGORÍAS
// ======================================

document.querySelectorAll(".menu button").forEach(boton=>{

    boton.addEventListener("click",()=>{

        const categoria=boton.dataset.categoria;

        document.querySelectorAll(".producto").forEach(producto=>{

            if(categoria==="todos"){

                producto.style.display="block";

                return;

            }

            producto.style.display=

            producto.dataset.categoria===categoria

            ? "block"

            : "none";

        });

    });

});


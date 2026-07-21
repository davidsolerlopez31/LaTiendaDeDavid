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
function actualizarCarrito(){

    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((producto,index)=>{

        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;

        listaCarrito.innerHTML += `

        <div class="item-carrito">

            <strong>
            ${producto.nombre}
            </strong>

            <p>
            ${producto.precio.toFixed(2)} €
            </p>

            <div>

            <button onclick="restarProducto(${index})">
            ➖
            </button>

            <span>
            ${producto.cantidad}
            </span>

            <button onclick="sumarProducto(${index})">
            ➕
            </button>

            <button onclick="eliminarProducto(${index})">
            ❌
            </button>

            </div>

        </div>

        `;

    });

    contador.textContent = cantidadTotal;

    totalTexto.textContent = total.toFixed(2);

    guardarCarrito();

}{

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

// ======================================
// MODAL DE DETALLES
// ======================================

const modal = document.getElementById("modalProducto");

const modalImagen = document.getElementById("modalImagen");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescripcion = document.getElementById("modalDescripcion");
const modalPrecio = document.getElementById("modalPrecio");

const cerrarModal = document.getElementById("cerrarModal");

const botonModalComprar = document.getElementById("modalComprar");

let productoModal = null;


// Abrir detalles

document.querySelectorAll(".detalles").forEach(boton => {


    boton.addEventListener("click",()=>{


        productoModal = {

            nombre: boton.dataset.titulo,

            precio: Number(
                boton.dataset.precio
                .replace("€","")
                .replace(",",".")
            ),

            imagen: boton.dataset.imagen,

            descripcion: boton.dataset.descripcion

        };


        modalImagen.src = productoModal.imagen;

        modalTitulo.textContent = productoModal.nombre;

        modalDescripcion.textContent =
        productoModal.descripcion;

        modalPrecio.textContent =
        boton.dataset.precio;


        modal.classList.remove("oculto");


    });


});


// Cerrar modal

cerrarModal.addEventListener("click",()=>{

    modal.classList.add("oculto");

});


// Cerrar al pulsar fuera

modal.addEventListener("click",(e)=>{

    if(e.target === modal){

        modal.classList.add("oculto");

    }

});


// Añadir desde modal

botonModalComprar.addEventListener("click",()=>{


    if(productoModal){


        const encontrado = carrito.find(
            p => p.nombre === productoModal.nombre
        );


        if(encontrado){

            encontrado.cantidad++;

        }else{


            carrito.push({

                nombre: productoModal.nombre,

                precio: productoModal.precio,

                cantidad:1

            });


        }


        guardarCarrito();

        actualizarCarrito();


        modal.classList.add("oculto");


    }


});

// ======================================
// PREPARAR PEDIDO WHATSAPP
// ======================================

const botonPedido = document.getElementById("pedido");


botonPedido.addEventListener("click",()=>{


    const nombreCliente =
    document.getElementById("nombreCliente").value.trim();


    const telefonoCliente =
    document.getElementById("telefonoCliente").value.trim();


    const direccionCliente =
    document.getElementById("direccionCliente").value.trim();



    if(carrito.length === 0){

        alert("El carrito está vacío");

        return;

    }



    if(
        nombreCliente === "" ||
        telefonoCliente === "" ||
        direccionCliente === ""
    ){

        alert("Completa todos los datos del cliente");

        return;

    }



    let mensaje =
`🛍️ PEDIDO LA TIENDA DE DAVID

👤 Cliente:
${nombreCliente}

📞 Teléfono:
${telefonoCliente}

📍 Dirección:
${direccionCliente}


📦 PRODUCTOS:

`;



    carrito.forEach(producto=>{


        mensaje +=
`${producto.nombre} x${producto.cantidad} - ${(producto.precio * producto.cantidad).toFixed(2)}€

`;


    });



    let total = carrito.reduce(
        (suma,producto)=>
        suma + (producto.precio * producto.cantidad),
        0
    );



    mensaje +=
`💶 TOTAL:
${total.toFixed(2)} €`;



    const texto =
    encodeURIComponent(mensaje);



    window.open(
        "https://wa.me/34633043371?text="+texto,
        "_blank"
    );


});


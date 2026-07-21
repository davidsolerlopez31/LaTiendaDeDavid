
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
});

const botones = document.querySelectorAll(".comprar");
const contador = document.getElementById("contador");
const listaCarrito = document.getElementById("listaCarrito");
const totalTexto = document.getElementById("total");
const carritoBox = document.getElementById("carrito");
const verCarrito = document.getElementById("verCarrito");
const botonPedido = document.getElementById("pedido");
const buscador = document.getElementById("buscador");


// Añadir productos
botones.forEach(boton => {

    boton.addEventListener("click", function(){

        const nombre = this.dataset.nombre;
        const precio = Number(this.dataset.precio);

        const encontrado = carrito.find(p => p.nombre === nombre);

        if(encontrado){
            encontrado.cantidad++;
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


// Abrir y cerrar carrito
verCarrito.addEventListener("click", () => {

    carritoBox.classList.toggle("oculto");

});


// Actualizar carrito
function actualizarCarrito(){

    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidad = 0;


    carrito.forEach((producto,index)=>{

        total += producto.precio * producto.cantidad;
        cantidad += producto.cantidad;


        listaCarrito.innerHTML += `
        <div>
        ${producto.nombre} x${producto.cantidad}
        - ${producto.precio * producto.cantidad}€
        <button onclick="eliminarProducto(${index})">
        ❌
        </button>
        </div>
        `;

    });


    contador.textContent = cantidad;
totalTexto.textContent = total;

localStorage.setItem("carrito", JSON.stringify(carrito));
}




// Eliminar
function eliminarProducto(index){

    carrito.splice(index,1);
    actualizarCarrito();

}


// Buscador
buscador.addEventListener("input",()=>{

    let texto = buscador.value.toLowerCase();

    document.querySelectorAll(".producto").forEach(producto=>{

        let nombre = producto.querySelector("h2").textContent.toLowerCase();

        producto.style.display =
        nombre.includes(texto) ? "block" : "none";

    });

});


// Preparar pedido
botonPedido.addEventListener("click",()=>{
    const nombreCliente = document.getElementById("nombreCliente").value;
const telefonoCliente = document.getElementById("telefonoCliente").value;
const direccionCliente = document.getElementById("direccionCliente").value;


if(nombreCliente === "" || telefonoCliente === "" || direccionCliente === ""){

    alert("Completa todos los datos del cliente");

    return;

}

    if(carrito.length===0){
        alert("El carrito está vacío");
        return;
    }

    let mensaje =
`PEDIDO LA TIENDA DE DAVID

Cliente: ${nombreCliente}
Teléfono: ${telefonoCliente}
Dirección: ${direccionCliente}

Productos:
`;

    carrito.forEach(producto=>{

        mensaje += `${producto.nombre} x${producto.cantidad} - ${producto.precio * producto.cantidad}€\n`;

    });


    mensaje += `\nTotal: ${totalTexto.textContent}€`;


    let texto = encodeURIComponent(mensaje);


    window.open(
        "https://wa.me/34633043371?text="+texto,
        "_blank"
    );

});

function filtrarCategoria(categoria){

    document.querySelectorAll(".producto").forEach(producto=>{

        if(producto.classList.contains(categoria)){
            producto.style.display="block";
        }else{
            producto.style.display="none";
        }

    });

}


function mostrarTodos(){

    document.querySelectorAll(".producto").forEach(producto=>{

        producto.style.display="block";

    });

}

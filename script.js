let cartCount = 0;

const cartNumber = document.getElementById("cartCount");
const buttons = document.querySelectorAll(".add-cart");


// CARRITO

buttons.forEach(button => {

    button.addEventListener("click", () => {

        cartCount++;

        cartNumber.textContent = cartCount;

        button.textContent = "Añadido ✓";

        setTimeout(() => {
            button.textContent = "Añadir al carrito";
        }, 1200);

    });

});


// BUSCADOR

const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product");


searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();


    products.forEach(product => {

        const name = product.querySelector("h3")
        .textContent.toLowerCase();


        if(name.includes(searchText)){

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});

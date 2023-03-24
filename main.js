/** MUNDO BEBE - CARRITO DE COMPRAS **/
const totalCompra = document.getElementById("totalCompra");
const productos = [];

//Fetch

const productosURL = "/productos.json";

const contenedorProductos = document.getElementById("contenedorProd");

fetch(productosURL)
    .then(response => response.json())
    .then(datos => {
        console.log(datos)
        datos.forEach(producto => {
            productos.push(producto)
            console.log(producto)
        })
        mostrarProd()
    })


//Array del carrito.

let carrito = [];

/** Local Storage */

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


//Modifico el DOM mostrando los productos.


//Funcion para mostrar los prods en stock

const mostrarProd = () => {
    const contenedorProd = document.getElementById("contenedorProd");

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("text-center", "col-xl-4", "col-md-6", "col-sm-12");
        card.innerHTML = `
        <div class = "card">
            <img src = "${producto.img}" class = "card-img-tom imgProd" alt = "${producto.nombre}";>
        <div class = "card-body">
        <h2> ${producto.nombre} </h2>
        <p>${producto.modelo}</p>
        <p>${producto.precio}</p>
        <button class = "btn colorBtn  btnToast card" id= "boton${producto.id}" > Agregar <img src="./img/agregarcarrito.png" alt= "icono agregar al carrito"> </button>
            </div>
        </div>`


        contenedorProd.appendChild(card);

        //Agregar prods al carrito.
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener(`click`, () => {
            agregarAlCarrito(producto.id);
            Toastify ({
                text: "Producto agregado al Carrito",
                duration: 1000
            }).showToast();
        })
    })


}



let cerrar = document.querySelectorAll(".close")[0];
let abrir = document.querySelectorAll(".verCar")[0];
let modal = document.querySelectorAll(".modal")[0];
let modalContain = document.querySelectorAll(".modalContainer")[0];

abrir.addEventListener("click", function (e) {
    e.preventDefault();
    modalContain.style.opacity = "1";
    modalContain.style.visibility = "visible";
    modal.classList.toggle("modalClose");
});

cerrar.addEventListener("click", function () {
    modal.classList.toggle("modalClose");

    setTimeout(function () {
        modalContain.style.opacity = "0";
        modalContain.style.visibility = "hidden";
    }, 645)
})



//Funcion agregar al carrito:

const agregarAlCarrito = (id) => {
    const prodCarrito = carrito.find(producto => producto.id === id);
    if (prodCarrito) {
        prodCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    console.log(carrito);
    total();

    //LocalStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


//Mostrar Carrito

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();

})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("text-center", "col-xl-6", "col-md-6", "col-sm-12");
        card.innerHTML = `
        <div class = "card">
            <img src = "${producto.img}" class = "card-img-tom imgProd "  alt = "${producto.nombre}";>
        <div class = "card-body">
        <h3> ${producto.nombre} </h3>
        <p>${producto.modelo}</p>
        <p>${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <hr>
        <button class = "btn colorBtn"  id = "eliminar${producto.id}" >Eliminar</button>
            </div>
        </div>`

        contenedorCarrito.appendChild(card);

        //Eliminar prod del carrito

        const botton = document.getElementById(`eliminar${producto.id}`)
        botton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);

        })
    })
    total();
}

//Funcion eliminar prod del carrito

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //LS
    localStorage.setItem("carrito", JSON.stringify(carrito));
}









//vaciar carrito

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarCarrito();
})

const eliminarCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LS
    localStorage.clear();
}


//Mensaje TOTAL COMPRA:



function total() {
    let montoCompra = 0;
    carrito.forEach(producto => {
        montoCompra = montoCompra + producto.precio * producto.cantidad;
    })
    totalCompra.innerHTML = `Total $${montoCompra}`;
}


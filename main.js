/** MUNDO BEBE - CARRITO DE COMPRAS **/

//1)Mostrar productos en el HTML de forma dinamica.
//2)Agregar productos al carrito.
//3)Evitar la carga de productos repetidos en el carrito.
//4)Mostrar el carrito en el HTML.
//5)Eliminar productos del carrito.
//6)Calcular el total de la compra.
//7)Vaciar el carrito.
//8)Guardar el carrito en el localStorage.

//falta agregar: 9) Boton de finalizar compra.
//10) boton mas y menos en el producto.(p/cambiar cantidades del producto en el carrito)
//////////////////////////////////////////////


class Producto {
    constructor(id, nombre, modelo, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.modelo = modelo;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const cochecitoUno = new Producto(1, "Cochecito", "Verona", 60000, "img/cochecito1.png");
const cochecitoDos = new Producto(2, "Cochecito", "Berlin", 55000, "img/cochecito2.png");
const cochecitoTres = new Producto(3, "Cochecito", "Barcelona", 72000, "img/cochecito3.png");
const butacaUno = new Producto(4, "Butaca", "Neo", 80000, "img/butaca1.png");
const butacaDos = new Producto(5, "Butaca", "Trinity", 83000, "img/butaca2.png");
const butacaTres = new Producto(6, "Butaca", "Morfeo", 85000, "img/butaca3.png");
const sillitaUno = new Producto(7, "Sillita", "Luna", 89000, "img/silladecomer1.png");
const sillitaDos = new Producto(8, "Sillita", " Sol", 94000, "img/silladecomer2.png");
const sillitaTres = new Producto(9, "Sillita", "Estrella", 91000, "img/silladecomer3.png");

//Almaceno los productos en un Array.

const productos = [cochecitoUno, cochecitoDos, cochecitoTres, butacaUno, butacaDos, butacaTres, sillitaUno, sillitaDos, sillitaTres];

//Array del carrito.

let carrito = [];

/** Local Storage */

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}




//Verifico por consola.
console.log(productos);

//Modifico el DOM mostrando los productos.

const contenedorProd = document.getElementById("contenedorProd");

//Funcion para mostrar los prods en stock

const mostrarProd = () => {
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
        <button class = "btn colorBtn" id= "boton${producto.id}" > Agregar <img src="./img/agregarcarrito.png" alt= "icono algregar al carrito"> </button>
            </div>
        </div>`
      

        contenedorProd.appendChild(card);

        //Agregar prods al carrito.
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener(`click`, () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProd();


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
        card.classList.add("text-center", "col-xl-4", "col-md-6", "col-sm-12");
        card.innerHTML = `
        <div class = "card">
            <img src = "${producto.img}" class = "card-img-tom imgProd" alt = "${producto.nombre}";>
        <div class = "card-body">
        <h3> ${producto.nombre} </h3>
        <p>${producto.modelo}</p>
        <p>${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <button class="btn colorBtn btnMasMenos ">+</button>
        <button class="btn colorBtn btnMasMenos " id ="MenosCantidad">-</button></p>
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

const totalCompra = document.getElementById("totalCompra");

const total = () => {
    let montoCompra = 0;
    carrito.forEach(producto => {
       montoCompra = montoCompra + producto.precio * producto.cantidad;
    })
    totalCompra.innerHTML = `Total $${montoCompra}`;
}




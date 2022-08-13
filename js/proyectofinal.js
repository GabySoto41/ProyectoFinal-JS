
// Declare global variables

let botones_compra = document.querySelectorAll(".boton_comprar");
let botones_aumentar = document.querySelectorAll(".aumentar");
let botones_disminuir = document.querySelectorAll(".disminuir");
let carrito = [];
let carrito_storage = [];
let talle_seleccionado = "";
let precio_total = 0;

// Asignar eventos a ciertos elementos

for( let boton of botones_compra){

    boton.addEventListener("click", agregar_carrito);
}

for (let btnAumentar of botones_aumentar) {

    btnAumentar.addEventListener("click", Aumentar);
}

for (let btnDisminuir of botones_disminuir) {

    btnDisminuir.addEventListener("click", Disminuir);
}
 
function agregar_carrito(e){

    let precio_seleccionado = 0;
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo= padre.parentNode;
    let nombre_producto = abuelo.querySelector("h5").textContent;
    let img = abuelo.querySelector("img").src;
    let precio = abuelo.querySelector("p").textContent;
    let cantidad = abuelo.querySelector ("input").value;    

    talle_seleccionado = abuelo.querySelector("select").value;
    precio_seleccionado = Number(precio.substr(2)); //remueve el $ y convierte el precio a numero

    if (talle_seleccionado == "no_talle"){

        Swal.fire({
            title: 'Por Favor Seleccione un Talle',
            width: 500,
            padding: '2em',
            color: '#716add',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://i.gifer.com/origin/fd/fdf70f5f4989f9c08f033da50c38170e_w200.webp")
              left top
              no-repeat
            `
          })   
    }

    else { 

        (precio_total == 0) ? precio_total = precio_seleccionado * cantidad : precio_total += precio_seleccionado * cantidad;
        

        let producto = {

            nombre: nombre_producto,
            img: img,
            precio: precio,
            cantidad: cantidad,
            talle: talle_seleccionado
        };

        carrito.push(producto);
        let producto_JSON = JSON.stringify(producto);
        carrito_storage.push(producto_JSON);
        localStorage.setItem("producto" , carrito_storage);
        mostrar_carrito( producto );
        abuelo.querySelector ("input").value = 1;
        abuelo.querySelector("select").value = "no_talle";
        
        Toastify({
            text: "Se Agrego el Producto al Carrito",
            duration: 3000,
            gravity: "top", 
            position: "left", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                fontFamily: "Oswald",
            },
        }).showToast();
    }
}


function mostrar_carrito( producto ){

    let fila = document.createElement("tr");
    let subTotal = "$ " + String(Number(producto.precio.substr(2)) * Number(producto.cantidad));
    fila.setAttribute("id", "myTr");
    fila.innerHTML = `<td><img src="${producto.img}"></td>
                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.talle}</td>
                    <td>${producto.precio}</td>
                    <td>${subTotal}</td>
                    <td><button class="btn btn-outline-danger borrar_elemento"> Borrar </buttton></td>` ;

    let body_tabla = document.getElementById("tbody");
    body_tabla.append( fila );

    let botones_borrar = document.querySelectorAll(".borrar_elemento");

    for (let boton of botones_borrar){

        boton.addEventListener("click" , borrar_producto);
    }

    document.getElementById ("precioTotal").innerHTML = "El precio total de su seleccion es: $" + precio_total
    talle_seleccionado = ""; //reset el valor de la variable
    document.getElementById ("carrito").scrollIntoView();
}

function borrar_producto(e){

    let precio_a_borrar = 0;
    let hijo = e.target;
    let abuelo = hijo.parentNode.parentNode;

// obtener el precio del producto a borrar y restarlo del precio total

    precio_a_borrar = Number(abuelo.cells[5].innerText.substr(2)); //remueve el $ y convierte el precio a numero
    precio_total = precio_total - precio_a_borrar;
    document.getElementById ("precioTotal").innerHTML = "El precio total de su seleccion es: $" + precio_total
    abuelo.remove();

    Toastify({
        text: "Se Borro el Producto del Carrito",
        duration: 3000,
        gravity: "top", 
        position: "left", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #f12711, #f5af19)",
            fontFamily: "Oswald",
        },
    }).showToast();
}

function Aumentar (e) {

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo= padre.parentNode;
    let inicio = abuelo.querySelector("input").value;
    abuelo.querySelector("input").value = ++inicio
}

function Disminuir (e) {

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo= padre.parentNode;
    let inicio = abuelo.querySelector("input").value;

    abuelo.querySelector("input").value = --inicio

    if (abuelo.querySelector("input").value <= 0) {

        abuelo.querySelector("input").value = 1;
    }
}






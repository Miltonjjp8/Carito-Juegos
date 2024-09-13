src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
//variables
const listaJuegos = document.querySelector('#lista-juegos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#btn-vaciar');

let carritoJuego = [];

// Eventos
cargarEventos();

function cargarEventos() {
    listaJuegos.addEventListener('click', agregarJuego);

    //eliminar juegos del carrito
    contenedorCarrito.addEventListener('click', eliminarJuego);

    //vaciar carrito
    vaciarCarrito.addEventListener('click', ()=>{
        carritoJuego = []; //reseteamos el arreglo

        limpiarHTML(); //eliminamos todo el HTML
    })
}

// Funciones
function agregarJuego(event) {
     //event.preventDefault(); //para que no se recargue la pagina al hacer click en el boton
    if (event.target.classList.contains('agregar-carrito')) {
        const juegoSeleccionado = event.target.parentElement.parentElement;
        leerDatosJuegos(juegoSeleccionado);
    }
}

// Elimina un juego del carrito
function eliminarJuego(event){
    if (event.target.classList.contains('borrar')) {
        const juegoId = event.target.getAttribute('data-id');

        // eliminar del arreglo de carritoJuego por el data-id
        carritoJuego = carritoJuego.filter(juego => juego.id !== juegoId);

        carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }
}

// leer datos HTML
function leerDatosJuegos(juego){

    

    //crear un objeto con el contenido del juego actual
    const infojuego = {
        imagen : juego.querySelector('img').src,
        titulo : juego.querySelector('h5').textContent,
        precio : juego.querySelector('p').textContent,
        id : juego.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    const existe = carritoJuego.some(juego => juego.id === infojuego.id);
    if (existe) {
        const juegos = carritoJuego.map(juego => {
            if (juego.id === infojuego.id) {
                juego.cantidad++;
                return juego; //retorna el objeto actualizado
            } else {
                return juego; //retorna los objetos que no son los duplicados
            }
        });
        carritoJuego = [...juegos];
    } else {
        //agregar al carrito 
        carritoJuego = [...carritoJuego, infojuego];
    }


    console.log(carritoJuego);
    carritoHTML();

}

// Mostrar carrito en el HTML
function carritoHTML(){

    //limpiar el HTML
    limpiarHTML();

    //recorre el carrito y genera el HTML
    carritoJuego.forEach(juego => {
        const {imagen, titulo, precio, cantidad, id} = juego;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width="100"> </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar btn btn-danger" data-id="${id}">X</a>
            </td>
        `;
        
        //agregar al tbody
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    //forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//alerta de compra
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alertTrigger = document.getElementById('liveAlertBtn')
if(carritoJuego.length > 0 !== alertTrigger){
    alertTrigger.addEventListener('click', () => {
        appendAlert('Compra de juego realizada con exito', 'success')
         console.log(carritoJuego.length > 0);

      })
}else{
    alertTrigger.addEventListener('click', () => {
        errAlert('No se ha Seleccionado un Juego', 'success')
        console.log( carritoJuego.length > 0);

      })
}

// if (alertTrigger) {
//   alertTrigger.addEventListener('click', () => {
//     appendAlert('Compra de juego realizada con exito', 'success')
//   })
// }

const appendAlert = (message) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-info alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" ></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
  carritoJuego = []; //reseteamos el arreglo
    limpiarHTML(); //eliminamos todo el HTML
}

const errAlert = (message) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-danger alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" ></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }


// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCarrito = document.querySelector('#lista-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Agregar curso
    listaCursos.addEventListener('click', agregarCurso);
    listaCarrito.addEventListener('click', eliminarCurso);
    vaciarCarrito.addEventListener('click', vaciarCarritoCursos);
}


// Funciones

function agregarCurso(e){ 
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        let idCursoEliminar = e.target.getAttribute('data-id');
        
        //let index = articulosCarrito.findIndex( curso => curso.id === idCursoEliminar);
        //articulosCarrito.splice(index,1);

        articulosCarrito = articulosCarrito.filter( curso => curso.id != idCursoEliminar);
        

        carritoHTML();
    }
}

function vaciarCarritoCursos(e){
    articulosCarrito = [];
    limpiarHTML();
}

function leerDatosCurso(curso){
    // Objeto  con el contenido del curso actual
    
    const infoCurso = {
        titulo : curso.querySelector('h4').textContent,        
        id : curso.querySelector('a').getAttribute('data-id'),
        imagen : curso.querySelector('img').src,
        precio : curso.querySelector('.precio span').textContent,
        cantidad : 1
    };    

//    if(!articulosCarrito.some( curso => curso.id === infoCurso.id)){
//        articulosCarrito = [...articulosCarrito, infoCurso];
//    }else{
//        let index = articulosCarrito.findIndex( curso => curso.id === infoCurso.id);
//        articulosCarrito[index].cantidad++;
//    }

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

    if(existe){
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });

        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();
}

function carritoHTML(){

    limpiarHTML();

    articulosCarrito.forEach( articulo =>{
        const row = document.createElement('tr');
        const {imagen, titulo, precio, cantidad, id} = articulo;
        row.innerHTML = ` 
            <td>
                <img src ="${imagen}" width="125px">
            </td>
            <td>
                <p class="center">${titulo}</p>
            </td>
            <td>
                <p class="center">${precio}</p>
            </td>
            <td>
                <p class="center">${cantidad}</b></p>
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id=${id}> X </a>
            </td>
        `;

        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML(){
    // Forma lenta
    //contenedorCarrito.innerHTML = ''

    //Forma rapida 
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


// function leerDatosCurso(curso){
//     console.log(curso.target.parentElement.parentElement);

//     const imagenCurso = document.createElement('img');
//     imagenCurso.src = curso.target.parentElement.parentElement.children[0].src;
//     imagenCurso.classList.add('imagenCarritoCurso')

//     const tituloCurso = document.createElement('p');
//     tituloCurso.textContent = curso.target.parentElement.children[0].textContent;
//     tituloCurso.classList.add('tituloCarritoCurso');

//     const autorCurso = document.createElement('p');
//     autorCurso.textContent = curso.target.parentElement.children[1].textContent;
//     autorCurso.classList.add('autorCarritoCruso');

//     const valorCurso = document.createElement('span');
//     valorCurso.textContent = curso.target.parentElement.children[3].children[0].textContent;
//     valorCurso.classList.add('valorCarritoCurso');


//     console.log(imagenCurso);
//     console.log(tituloCurso);
//     console.log(autorCurso);
//     console.log(valorCurso);

//     const contenedorCurso = document.createElement('div');
//     contenedorCurso.classList.add('contenedorCursoCarrito');

//     contenedorCurso.appendChild(tituloCurso);
//     contenedorCurso.appendChild(imagenCurso),
//     contenedorCurso.appendChild(autorCurso);
//     contenedorCurso.appendChild(valorCurso);

//     carrito.appendChild(contenedorCurso)
    
// }
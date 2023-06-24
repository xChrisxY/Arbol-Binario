const agregarParticipante = document.querySelector('#agregarParticipante');
const eliminarParticipante = document.querySelector('#eliminarParticipante');
const busqueda = document.querySelector('#busqueda');
const visualizar = document.querySelector('#visualizar');
const nombre = document.querySelector('#nombre');
const categoria = document.querySelector('#categoria');
const eliminar = document.querySelector('#eliminar');
const buscar = document.querySelector('#buscar');
const tabla = document.querySelector('#tabla');
const tbody = document.querySelector('#tabla tbody')
const error = document.querySelector('#error');
const errorEliminar = document.querySelector('#errorEliminar');
const esconder = document.querySelector('#esconder')
const muestraParticipante = document.querySelector('#seccionBusqueda')
let resultado = []
let agregado = false;


document.addEventListener("DOMContentLoaded", () => {

    agregarParticipante.addEventListener('click', añadirParticipante);
    eliminarParticipante.addEventListener('click', eliminarConcursante);
    esconder.addEventListener('click', esconderBusqueda);
    busqueda.addEventListener('click', buscarParticipante);
    visualizar.addEventListener('click', mostrarTabla);
    

    const arbol = new ArbolBinario();

    if (!agregado) {

        const a1 = { nombre: "Cristiano Ronaldo", categoria: "Avanzado", folio: 1234 };
        const a2 = { nombre: "Miles Morales", categoria: "Intermedio", folio: 4321 };
        const a3 = { nombre: "Peter Parker", categoria: "Principiante", folio: 9821 };
        const a4 = { nombre: "Guillermo Ochoa", categoria: "Avanzado", folio: 4129 };
        const a5 = { nombre: "Leonardo Dicaprio", categoria: "Principiante", folio: 5678 };

        arbol.add(a1)
        arbol.add(a2)
        arbol.add(a3)
        arbol.add(a4)
        arbol.add(a5)

        agregado = true;
    }

    mostrarParticipantes(arbol.raiz, resultado);
    console.log(resultado);  // Imprime los valores almacenados en el objeto


    function añadirParticipante(e) {


        e.preventDefault();

        if ([nombre.value, categoria.value].includes('')) {

            error.textContent = "Debe llenar todos los campos del formulario";
            error.classList.add('error');

            setTimeout(() => {

                error.remove();

            }, 3000);

        } else {

            // creamos el folio y comprobamos si nadie lo tiene
            let folio = Math.floor(Math.random() * 9000) + 1000;

            console.log(arbol.buscarFolio(1234));

            while (arbol.buscarFolio(folio) === true) {

                folio = Math.floor(Math.random() * 9000) + 1000;

            }

            const objeto = {

                nombre: nombre.value,
                categoria: categoria.value,
                folio

            }

            arbol.add(objeto);

            resultado = [];

            mostrarParticipantes(arbol.raiz, resultado);
            console.log(resultado); 
        }

    }

    function eliminarConcursante(e) {

        e.preventDefault();

        if (eliminar.value === '') {

            errorEliminar.textContent = "Debe llenar todos los campos del formulario";
            errorEliminar.classList.add('error');

            setTimeout(() => {

                errorEliminar.textContent = "";
                errorEliminar.classList.remove('error');

            }, 3000);

        } else {

            if (arbol.buscar(parseInt(eliminar.value)) !== null) {  

                arbol.remove(parseInt(eliminar.value));

                resultado = [];

                mostrarParticipantes(arbol.raiz, resultado);

                console.log(resultado); 

                mostrarTabla();


            } else {

                console.log("El participante no fué encontrado")
                errorEliminar.textContent = "No se ha encontrado ningún participante";
                errorEliminar.classList.add('advertencia');
    
                setTimeout(() => {
    
                    errorEliminar.textContent = "";
                    errorEliminar.classList.remove('advertencia');
    
                }, 3000);

            }

        }


    }

    function buscarParticipante(e) {

        e.preventDefault();

        if (buscar.value !== '') {

            if (arbol.buscar(parseInt(buscar.value)) !== null) {

                const objeto = (arbol.buscar(parseInt(buscar.value)))

                console.log(objeto)
                muestraParticipante.innerHTML = `
                
                    <h4>Nombre del participante: <span class="titulos">${objeto.nombre}</span> </h4>
                    <h4>Categoria en la que se encuentra: <span class="titulos">${objeto.categoria}</span></h4>
                    <h4>Folio: <span class="titulos">${objeto.folio}</span></h4>

                `

                muestraParticipante.classList.add('participante');

            } else {

                muestraParticipante.textContent = "No se ha encontrado ningún participante";
                muestraParticipante.classList.add('advertencia');
    
                setTimeout(() => {
    
                    muestraParticipante.textContent = "";
                    muestraParticipante.classList.remove('advertencia');
    
                }, 3000);

            }


        } else {

            muestraParticipante.textContent = "Debe llenar todos los campos del formulario";
            muestraParticipante.classList.add('error');

            setTimeout(() => {

                muestraParticipante.textContent = "";
                muestraParticipante.classList.remove('error');

            }, 3000);

        }

    }

    function esconderBusqueda(e) {

        e.preventDefault()

        while (muestraParticipante.firstChild) {

            muestraParticipante.removeChild(muestraParticipante.firstChild);

        }

        muestraParticipante.classList.remove('participante');


    }


})


function mostrarTabla() {

    limpiarHTML()

    resultado.map((p, index) => {

        const { nombre, categoria, folio } = p;

        const row = document.createElement('tr');

        row.innerHTML = `
        
            <td>${index}</td>
            <td>${nombre}</td>
            <td>${categoria}</td>
            <td>${folio}</td>
        
        `
        tbody.appendChild(row);

    })

}

function limpiarHTML() {

    while (tbody.firstChild) {

        tbody.removeChild(tbody.firstChild);
    }

}

class ArbolBinario {

    constructor() {

        this.raiz = null;

    }

    add(objeto) {

        const nodo = new Nodo(objeto);

        if (!this.raiz) {

            this.raiz = nodo;

        } else {

            this.insertarNodo(this.raiz, nodo);

        }

    }

    insertarNodo(nodoActual, nodoNuevo) {

        if (nodoActual.getObjeto().folio > nodoNuevo.getObjeto().folio) {

            if (!nodoActual.getHijoIzquierdo()) {

                nodoActual.setHijoIzquierdo(nodoNuevo);

            } else {

                this.insertarNodo(nodoActual.getHijoIzquierdo(), nodoNuevo);

            }

        } else {

            if (!nodoActual.getHijoDerecho()) {

                nodoActual.setHijoDerecho(nodoNuevo);

            } else {

                this.insertarNodo(nodoActual.getHijoDerecho(), nodoNuevo);

            }
        }

    }

    buscar(folio) {

        return this.buscarNodo(this.raiz, folio);

    }

    buscarNodo(nodo, folio) {

        if (!nodo) {

            return null;

        }

        if (nodo.getObjeto().folio === folio) {

            return nodo.getObjeto();

        } else if (folio < nodo.getObjeto().folio) {

            return this.buscarNodo(nodo.getHijoIzquierdo(), folio);

        } else {

            return this.buscarNodo(nodo.getHijoDerecho(), folio);

        }
    }

    remove(folio) {
        this.raiz = this.eliminarNodo(this.raiz, folio);
      }
    

    eliminarNodo(nodo, folio) {

        if (!nodo) {

          return nodo;

        }
    
        if (folio < nodo.getObjeto().folio) {

          nodo.setHijoIzquierdo(this.eliminarNodo(nodo.getHijoIzquierdo(), folio));

        } else if (folio > nodo.getObjeto().folio) {
          nodo.setHijoDerecho(this.eliminarNodo(nodo.getHijoDerecho(), folio));

        } else {
            
          if (!nodo.getHijoIzquierdo()) {
            return nodo.getHijoDerecho();
          } else if (!nodo.getHijoDerecho()) {
            return nodo.getHijoIzquierdo();
          } else {
            const sucesor = this.encontrarMinimo(nodo.getHijoDerecho());
            nodo.getObjeto().folio = sucesor.getObjeto().folio;
            nodo.setHijoDerecho(this.eliminarNodo(nodo.getHijoDerecho(), sucesor.getObjeto().folio));
          }
        }
    
        return nodo;
      }
    
      encontrarMinimo(nodo) {
        if (!nodo) {
          return null;
        }
    
        while (nodo.getHijoIzquierdo()) {
          nodo = nodo.getHijoIzquierdo();
        }
    
        return nodo;
      }

    buscarFolio(folio) {

        return this.buscarNodoFolio(this.raiz, folio);

    }

    buscarNodoFolio(nodo, folio) {

        if (!nodo) {

            return null;

        }

        if (nodo.getObjeto().folio === folio) {

            return true;

        } else if (folio < nodo.getObjeto().folio) {

            return this.buscarNodo(nodo.getHijoIzquierdo(), folio);

        } else {

            return this.buscarNodo(nodo.getHijoDerecho(), folio);

        }
    }



}

class Nodo {

    constructor(objeto) {

        this.objeto = objeto;
        this.hijoIzquierdo = null;
        this.hijoDerecho = null;

    }

    getObjeto() {
        return this.objeto;
    }

    getHijoIzquierdo() {
        return this.hijoIzquierdo;
    }

    setHijoIzquierdo(nodo) {
        this.hijoIzquierdo = nodo;
    }

    getHijoDerecho() {
        return this.hijoDerecho;
    }

    setHijoDerecho(nodo) {
        this.hijoDerecho = nodo;
    }
}

function recorrerInOrden(node) {

    if (node !== null) {

        recorrerInOrden(node.getHijoIzquierdo());

        console.log(node.getObjeto());

        recorrerInOrden(node.getHijoDerecho());

    }
}

function recorrerPreOrden(node) {

    if (node !== null) {

        console.log(node.getObjeto());

        recorrerPreOrden(node.getHijoIzquierdo());

        recorrerPreOrden(node.getHijoDerecho());

    }
}

function recorrerPostOrden(node) {

    if (node !== null) {

        recorrerPostOrden(node.getHijoIzquierdo());

        recorrerPostOrden(node.getHijoDerecho());

        console.log(node.getObjeto());

    }
}

function mostrarParticipantes(node, arreglo) {

    if (node !== null) {
        mostrarParticipantes(node.getHijoIzquierdo(), arreglo);

        // Almacena el valor en el objeto
        arreglo.push(node.getObjeto());

        mostrarParticipantes(node.getHijoDerecho(), arreglo);
    }
}



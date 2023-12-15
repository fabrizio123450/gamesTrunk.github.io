document.addEventListener('DOMContentLoaded', () => {
    //Creamos un array con nuestras cartas
    const mazoCartas = [
        {
            nombre: 'earth',
            img: 'earth.jpg'
        },
        {
            nombre: 'sun',
            img: 'sun.jpg'
        },
        {
            nombre: 'ship',
            img: 'ship.jpg'
        },
        {
            nombre: 'redplanet',
            img: 'redplanet.jpg'
        },
        {
            nombre: 'greenplanet',
            img: 'greenplanet.jpg'
        },
        {
            nombre: 'alien',
            img: 'alien.jpg'
        },
        {
            nombre: 'earth',
            img: 'earth.jpg'
        },
        {
            nombre: 'sun',
            img: 'sun.jpg'
        },
        {
            nombre: 'ship',
            img: 'ship.jpg'
        },
        {
            nombre: 'redplanet',
            img: 'redplanet.jpg'
        },
        {
            nombre: 'greenplanet',
            img: 'greenplanet.jpg'
        },
        {
            nombre: 'alien',
            img: 'alien.jpg'
        }
    ]

    mazoCartas.sort(() => 0.5 - Math.random())//se ubican de manera aleatoria

    const grid = document.querySelector('.grid')
    let puntos = 60;//tenemos tiempo 1.5 minutos
    const elementoPuntaje = document.getElementById("puntaje");//para cambiar el puntaje

    // Una funcion que disminuira el puntaje cada minuto
    function actualizarPuntaje() {
        puntos -= 1;
        // Mostrar el nuevo puntaje 
        elementoPuntaje.textContent = "Puntaje: " + puntos;
    }
    // el intervalo para llamar a la función cada segundo 
    let intervaloid = setInterval(actualizarPuntaje, 1000);
    setTimeout(() => {//Una vez que el tiempo se acabe haz perdido
        clearInterval(intervaloid)
        elementoPuntaje.textContent = "Se acabo el tiempo !! haz perdido..."
        console.log(puntos)
    }, 60000)//luegp de 1.5 min se pierde

    let cartaselegidas = []
    let elegidasId = []
    let cartasganadoras = []

    //creamos el mazo
    function crearmazo() {
        for (let i = 0; i < mazoCartas.length; i++) {//repetimos segun el tamaño del array
            const carta = document.createElement('img')
            carta.setAttribute('src', 'stars.jpg')
            carta.setAttribute('data-id', i)
            carta.addEventListener('click', darvuelta)//cada vez que hagamos click la carta se mostrara
            grid.appendChild(carta)
        }
    }

    //para el control de las cartas que coincidan
    function cartascoinciden() {
        const cartas = document.querySelectorAll('img')
        //optenemos el id de las dos cartas que elegimos
        const opcion1 = elegidasId[0]
        const opcion2 = elegidasId[1]

        if (opcion1 == opcion2) {//si eligio dos veces la misma carta
            cartas[opcion1].setAttribute('src', 'stars.jpg')
            cartas[opcion2].setAttribute('src', 'stars.jpg')
        }
        else if (cartaselegidas[0] === cartaselegidas[1]) {//si eligio dos cartas diferentes pero igual img, salen del mazo
            cartas[opcion1].setAttribute('src', 'background.gif')//salen del mazo poniendo otro fondo
            cartas[opcion2].setAttribute('src', 'background.gif')
            cartas[opcion1].removeEventListener('click', darvuelta)//ya no se puede hacer click en el lugar donde estaban
            cartas[opcion2].removeEventListener('click', darvuelta)
            cartasganadoras.push(cartaselegidas)//añadimos en el array las cartas que salieron del mazo
        } else {//si fallo y no son iguales,vuelven a cubrirse
            cartas[opcion1].setAttribute('src', 'stars.jpg')
            cartas[opcion2].setAttribute('src', 'stars.jpg')
        }
        //se limpian los arrays para volver a usarlos de ser necesario
        cartaselegidas = []
        elegidasId = []
        //si las cartas elegidas son iguales a todo el mazo, ha ganado
        if (cartasganadoras.length === mazoCartas.length / 2) {
            elementoPuntaje.textContent = "Felicidades!! haz ganado!! Puntaje: "+puntos;
            clearInterval(intervaloid);//se detiene el contador de puntaje o  tiempo
        }
    }

    //Para dar vuelta las cartas
    function darvuelta() {
        let cartaId = this.getAttribute('data-id')
        cartaselegidas.push(mazoCartas[cartaId].nombre)
        elegidasId.push(cartaId)//se obtiene la carta seleccionada
        this.setAttribute('src', mazoCartas[cartaId].img)
        if (cartaselegidas.length === 2) {//si son iguales
            setTimeout(cartascoinciden, 500)//te muesta medio segundo luego de que coincidan
        }
    }

    crearmazo()//empieza el juego creando el mazo
})
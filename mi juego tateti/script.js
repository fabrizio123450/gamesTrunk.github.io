//Obtenemos el tablero 
const tablero = document.getElementById("tablero");
let jugadorActual = "X";//El jugador sera la x 
let celdas = [null, null, null, null, null, null, null, null, null]; //tablero vacio 

// tenemos un array de las posibles convinaciones en las que el jugador gane 
const seriesganadoras = [
    //linea horizontal de 3 secuencias -
    [true, true, true, false, false, false, false, false, false], 
    [false, false, false, true, true, true, false, false, false], 
    [false, false, false, false, false, false, true, true, true], 
    //linea vertical de 3 secuencias l
    [true, false, false, true, false, false, true, false, false], 
    [false, true, false, false, true, false, false, true, false], 
    [false, false, true, false, false, true, false, false, true], 
    //lineas curvas de secuencias ganadoras /
    [true, false, false, false, true, false, false, false, true], 
    [false, false, true, false, true, false, true, false, false]  
];


// funcion para cuando se llene el array, tablero lleno
function empateTab() {
    //asumimos que esta lleno
    for (let i = 0; i < celdas.length; i++) {
        if (celdas[i] == null) {//si el tablero esta vacio retorna false
           return false;
            break;
        }
    }
    return true;//retornamos true
}

// funcion que simula los movimientos de otro jugador 
function turnodeO() {
    const lugareslibres = [];
    //vemos que lugares estan disponibles
    for (let i = 0; i < celdas.length; i++) {
        if (celdas[i] === null) {
            lugareslibres.push(i);
        }
    }
    //Si no queda lugar no puede hacer un movimiento
    if (lugareslibres.length === 0) {
        return;
    }
    // hace un movimiento al azar en los lugares disponibles 
    const posicionAleatoria = Math.floor(Math.random() * lugareslibres.length);
    const lugarelegido = lugareslibres[posicionAleatoria];
    celdas[lugarelegido] = "O";
    marcarTablero();//luego de poner , actualizamos el tablero
    jugadorActual = "X";
    if (esganador("O")) {//verificamos si gano 
        alert("Haz perdido !! te ha ganado O")
    } else if (empateTab()) {//verificamos si hubo un empate
        alert("Empataron");
    }
}
// función para verificar si un jugador ha ganado
function esganador(jugador) {
    for (let i = 0; i < seriesganadoras.length; i++) {
        const combinacion = seriesganadoras[i];
        let winner = true;
        for (let j = 0; j < combinacion.length; j++) {
            if (combinacion[j] && celdas[j] !== jugador) {//si el jugador no cumple 
                winner = false;//retorna false
                break;
            }
        }
        
        if (winner) {
            return true;// si se cumplen retorna true
        }
    }

    // si no hay winner en ninguna combinación, devolvemos false
    return false;
}
// Funcion para agregar las x y las o en el tablero
function marcarTablero() {
    tablero.innerHTML = "";//llamamos al tablero
    for (let i = 0; i < celdas.length; i++) {
        const celdaElemento = document.createElement("div");
        celdaElemento.classList.add("celda");
        celdaElemento.textContent = celdas[i];
        celdaElemento.addEventListener("click", () => {//si se hace click
            if (celdas[i] == null && jugadorActual == "X") {//si el lugar esta vacio y es jugador es x
                celdas[i] = "X";//añadimos una x 
                marcarTablero();//lo mostramos en la interfaz
                jugadorActual = "O";//luego de marcar el turno pasa a O marcar 
                if (esganador("X")) {//controlamos si ganamos
                    alert("¡Felicidades! haz ganado!! :D");
                } else if (empateTab()) {//controla si hubo un empate
                    alert("Empate");
                } else {//le deja a O tomar su turno 
                    turnodeO();
                }
            }
        });
        tablero.appendChild(celdaElemento);
    }
}
// Para el boton de reinicio
const botonReiniciar = document.getElementById("reiniciar");
botonReiniciar.addEventListener("click", reiniciarJuego);
// Para reiniciar el juego
function reiniciarJuego() {
    // Vacia las celdas
    for (let i = 0; i < celdas.length; i++) {
        celdas[i] = null;
    }
    jugadorActual = "X";//damos el primer turno al usuario
//reinicia el tablero
    marcarTablero();
}
//Para volver a la pagina anterior
const botonVolver = document.getElementById("volver");
botonVolver.addEventListener ('click', () => {
    window.location.href = '../index.html';
    });


// mostramos el tablero
marcarTablero();

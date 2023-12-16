/**
 * Variables
 */
/**
 * Por defecto esta en ingles
 * Al cambiar a español aunque la palabra te muestra con acento
 * este fue removido en el codigo
 */
let palabraW = '';
let palabras = ["above", "agent", "crazy", "focus", "mints"];
const url = 'https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase';
//api para verificar la palabra
let urlR = "https://api.dictionaryapi.dev/api/v2/entries/en/"

/**
 * Funcion que se llama en caso de no funcionar el api
 */
function palabraRandom() {
    palabraW = palabras;
    palabraW = palabraW[Math.floor(Math.random() * palabraW.length)].toUpperCase();
    console.log("palabra: ", palabraW);
}
//por defecto ya hace fetch pero la palabra esta en ingles
fetch(url).then(response => response.json())
    .then(response => {
        console.log("palabra: ", response);
        palabraW = response[0].toUpperCase();
    })
    .catch(err => {
        console.error("Error al obtener la palabra:", err);
        palabraRandom();
    });

//elementos de mi html
const mybutton = document.getElementById('reset');
const htmPalabra = document.getElementById('palabra');
const campos = document.querySelectorAll('.campo');
const keys = document.querySelectorAll('.key');
let intentos = 6;
//boton atras
document.getElementById('back').addEventListener('click', ()=>{
    window.location.href = "../index.html"
})

campos.forEach((campo, index) => {
    campo.addEventListener('input', (event) => {
        const valor = event.target.value;
        const inputLength = event.target.value.length;
        // Si se ingresó una letra, pasar al siguiente campo
        if (valor.match(/[a-zA-Z]/)) {
            if (index < campos.length - 1) {
                campos[index + 1].focus();
                event.target.setSelectionRange(inputLength, inputLength);
            }
        }

    });
    campo.addEventListener('keydown', (event) => {

        // vuelve a la letra anterior
        if (event.key === 'Backspace') {
            if (index !== 0) {
                campos[index].value = ''
                campos[index - 1].focus();
            }
        }
        if (event.key === 'Enter') {
            wordlePPY();
        }

    });

});
/**
 * juego wordlePPY
 * @returns si la palabra es pequeña no hace nada
 */
function wordlePPY() {

    console.log("la palabra es " + palabraW);
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    let myInput = '';
    campos.forEach((campo) => {
        myInput += campo.value.toUpperCase();
    });

    if (myInput.length < 5) {
        htmPalabra.innerHTML = "PALABRA CORTA";
        return;
    }
    urlR += myInput;
    fetch(urlR).then(response => response.json())
        .then(response => {
            console.log("LA PALABRA ES: ", response[0].word)
            for (let i in palabraW) {
                const SPAN = document.createElement('span');
                SPAN.className = 'letter';
                const isMatch = palabraW[i] === myInput[i];
                const isPartialMatch = palabraW.includes(myInput[i]);
                SPAN.innerHTML = myInput[i];
                //VERDE, AMARILLO, GRIS
                //para saber que colores son
                SPAN.style.backgroundColor = isMatch ? '#1e851e' : (isPartialMatch ? '#bca300' : '#5a5b5a');
                //recorro todos los elementos key y pinto el teclado 
                keys.forEach(key => {
                    //si ya es verde no cambia el color del boton
                    if (myInput[i] === key.innerHTML &&
                        key.style.backgroundColor !== 'rgb(30, 133, 30)' && key.style.backgroundColor !== '#1e851e') {
                        key.style.backgroundColor = SPAN.style.backgroundColor;
                    }
                });
                ROW.appendChild(SPAN);

            }
            GRID.appendChild(ROW);
            --intentos;
            htmPalabra.innerHTML = "tienes " + intentos + " intentos";


            if (myInput.includes(palabraW) || intentos === 0) {
                const mensaje = myInput.includes(palabraW) ? "GANASTE 😀" : "PERDISTE 😖";
                htmPalabra.innerHTML = mensaje;

                campos.forEach((campo) => {
                    campo.style.display = 'none'
                });

                mybutton.style.display = 'block';
            }
            urlR = "https://api.dictionaryapi.dev/api/v2/entries/en/"
        })
        .catch(err => {
            htmPalabra.innerHTML = "NO ES UNA PALABRA"
            //console.error("MAAAAAAN SOS RE IMBECIL", err);
            urlR = "https://api.dictionaryapi.dev/api/v2/entries/en/"
        });



}
//metodo para recargar la pag de 0
mybutton.addEventListener('click', () => {
    window.location.href = window.location.href;
});


// Abrir el modal cuando se hace clic en el botón
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');
const closeModalBtn = document.querySelector('.close');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Cerrar el modal cuando se hace clic en la "X"
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera del modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

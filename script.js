// Obtenemos el botón por su identificador
let botonJuego2 = document.getElementById("game2");
let botonJuego3 = document.getElementById("game3");


// Agregamos un evento de clic al botón
botonJuego2.addEventListener("click", function() {
    // Redirige a otra_pagina.html
    window.location.href = "mi juego de memoria/index.html";
});
botonJuego3.addEventListener("click", function() {
    // Redirige a otra_pagina.html
    window.location.href = "wordle/index.html";
});
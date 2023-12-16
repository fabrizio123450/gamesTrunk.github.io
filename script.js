// Obtenemos el botón por su identificador
let botonJuego1 = document.getElementById("game1");
let botonJuego2 = document.getElementById("game2");
let botonJuego3 = document.getElementById("game3");
let botonJuego4 = document.getElementById("game4");

/**
 * repo juego 1
 * https://github.com/fabrizio123450/avion.github.io
 */
// Agregamos un evento de clic al botón
botonJuego1.addEventListener("click", function() {
    // Redirige a otra_pagina.html
    window.location.href = "https://fabrizio123450.github.io/avion.github.io/";
});
botonJuego2.addEventListener("click", function() {
    window.location.href = "mi juego de memoria/index.html";
});
botonJuego3.addEventListener("click", function() {
    window.location.href = "wordle/index.html";
});
botonJuego4.addEventListener("click", function() {
    window.location.href = "mi juego tateti/index.html";
});
function selectword(lista) {
    let options = lista.palabras;
    let randomNum = Math.floor(Math.random() * options.length);
    document.getElementById("word").innerHTML = "La palabra será: <b>" + options[randomNum].toUpperCase() + "</b>";
}

const l4 = document.getElementById("dificultad4");
l4.addEventListener("click", function() { selectword(letras4); });
const l5 = document.getElementById("dificultad5");
l5.addEventListener("click", function() { selectword(letras5); });
const l6 = document.getElementById("dificultad6");
l6.addEventListener("click", function() { selectword(letras6); });
const l7 = document.getElementById("dificultad7");
l7.addEventListener("click", function() { selectword(letras7); });
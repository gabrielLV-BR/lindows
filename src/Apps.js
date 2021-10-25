import _Chrome from "./apps/Programa.svelte";
import _Cronometro from "./apps/Cronometro.svelte";
import _Calculadora from "./apps/Calculadora.svelte";
import _Lista from "./apps/Lista.svelte";
import _Dinogame from "./apps/jogos/Dinogame.svelte";

const Chrome = {
    name: "Chrome",
    id: "chrome",
    image: "../res/icons/chrome.png",
    app: _Chrome
}

const Cronometro = {
    name: "Timer",
    id: "cronometro",
    image: "../res/icons/cronometro.png",
    app: _Cronometro
}

const Calculadora = {
    name: "Calculadora",
    id: "calculadora",
    image:"../res/icons/calculadora.png",
    app: _Calculadora
}

const Lista = {
    name: "Lista",
    id: "lista",
    image:"../res/icons/lista.png",
    app: _Lista
}

const Dinogame = {
    name: "Dino Game",
    id: "dinogame",
    image:"../res/icons/dino.png",
    app: _Dinogame
}

const Programas = [
    Chrome,
    Cronometro,
    Calculadora,
    Lista,
    Dinogame 
]

function sortByName(a, b) {
    if(a.name < b.name) return -1;
    else if(a.name > b.name) return 1;
    return 0;
}

// Isso ajuda no StartMenu
export default Programas.sort(sortByName);

export const findProgram = (id = "") => {
    return Programas.find(el => el.id === id)
}

export const findProgramIndex = (id = "") => {
    return Programas.findIndex(el => el.id === id)
}
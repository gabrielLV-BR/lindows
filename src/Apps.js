import _Chrome from "./apps/Programa.svelte";
import _Cronometro from "./apps/Cronometro.svelte";
import _Calculadora from "./apps/Calculadora.svelte";

const Chrome = {
    name: "Chrome",
    id: "chrome",
    image: "../res/icons/chrome.png",
    app: _Chrome
}

const Cronometro = {
    name: "Cronômetro",
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

const Programas = [
    Chrome,
    Cronometro,
    Calculadora 
]

export default Programas;

export const findProgram = (id = "") => {
    return Programas.find(el => el.id === id)
}

export const findProgramIndex = (id = "") => {
    return Programas.findIndex(el => el.id === id)
}
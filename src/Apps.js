import _Chrome from "./apps/Programa.svelte";
import _Cronometro from "./apps/Cronometro.svelte"

const Chrome = {
    name: "Chrome",
    id: "chrome",
    image: "../res/icons/chrome.png",
    app: _Chrome
}

const Cronometro = {
    name: "Cronometro",
    id: "cronometro",
    image: "../res/icons/cronometro.png",
    app: _Cronometro
}

const Programas = [
    Chrome,
    Cronometro
]

export default Programas;

export const findProgram = (id = "") => {
    return Programas.find(el => el.id === id)
}

export const findProgramIndex = (id = "") => {
    return Programas.findIndex(el => el.id === id)
}
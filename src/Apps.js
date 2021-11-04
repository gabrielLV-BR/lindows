// Esse arquivo contém a importação e a organização dos 
// apps para que sejam facilmente lançados e identificados

import _Navegador from "./apps/Navegador.svelte";
import _Cronometro from "./apps/Cronometro.svelte";
import _Calculadora from "./apps/Calculadora.svelte";
import _Lista from "./apps/Lista.svelte";
import _Dinogame from "./apps/jogos/Dinogame.svelte";
import _Configuracoes from "./apps/Settings.svelte";
import _Galeria from "./apps/Galeria.svelte";
import _Notas from "./apps/Notas.svelte";

const Navegador = {
    name: "Navegador",
    id: "navegador",
    image: "../res/icons/browser.svg",
    app: _Navegador
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

const Settings = {
    name: "Configurações",
    id: "config",
    image:"../res/icons/settings.svg",
    app: _Configuracoes
}

const Galeria = {
    name: "Galeria",
    id: "galeria",
    image:"../res/icons/gallery.svg",
    app: _Galeria
}

const Notas = {
    name: "Notas",
    id: "notas",
    image:"../res/icons/notas.png",
    app: _Notas
}

const Programas = [
    Navegador,
    Cronometro,
    Calculadora,
    Lista,
    Dinogame,
    Settings,
    Galeria,
    Notas
]

export function sortByName(a, b) {
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
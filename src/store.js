// Uma store é um local onde podemos guardar variáveis globais.
// A diferença entre uma store e um arquivo normal é que uma store
// faz os componentes serem re-desenhados

import { writable } from "svelte/store";
import { findProgram } from "./Apps";

export const globalVariables = writable({
    theme: "light",
    isMobile: false,
    installedApps: [
        findProgram('navegador'), 
        findProgram('config')
    ]
});

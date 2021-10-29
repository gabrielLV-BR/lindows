// Uma store é um local onde podemos guardar variáveis globais.
// A diferença entre uma store e um arquivo normal é que uma store
// faz os componentes serem re-desenhados

import { writable, derived } from "svelte/store";

export const globalVariables = writable({
    theme: "light"
});
// Arquivo inicial do svelte, responsável por carregar o framework

import App from './App.svelte';

const app = new App({
	target: document.body,
});

export default app;
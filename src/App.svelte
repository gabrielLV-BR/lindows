<script>
	import Desktop from "./system/Desktop.svelte";
	import LogIn from "./system/login/LoginPage.svelte";

	import { globalVariables } from "./store";
	import { onMount, onDestroy } from "svelte";

	let hasLoggedIn = false;

	function handleResize(event) {
		globalVariables.set({
			...globalVariables, 
			isMobile: innerWidth < 600
		})
	}

	function logIn() {
		hasLoggedIn = true;
	}

	onMount(() => window.addEventListener("resize", handleResize));
	onDestroy(() => window.removeEventListener("resize", handleResize));
</script>

<!-- Essa página é quem troca entre a tela de login e o Desktop -->

<!-- {#if !hasLoggedIn}
	<LogIn enter={logIn} />
{:else} -->
	<Desktop />
<!-- {/if} -->

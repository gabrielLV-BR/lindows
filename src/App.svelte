<script>
	import LogIn from "./system/login/LoginPage.svelte";
	import Desktop from "./system/Desktop.svelte";

	let hasLoggedIn = false;

	function logIn() {
		hasLoggedIn = true;
	}
</script>

<!-- Essa página é quem troca entre a tela de login e o Desktop -->

{#if !hasLoggedIn}
	<LogIn enter={logIn} />
{:else}
	<Desktop />
{/if}
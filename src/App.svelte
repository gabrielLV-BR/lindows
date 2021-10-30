<script>
	import LogIn from "./system/login/LoginPage.svelte";
	import Desktop from "./system/Desktop.svelte";

	let hasLoggedIn = false;

	function logIn() {
		hasLoggedIn = true;
	}
</script>

{#if !hasLoggedIn}
	<LogIn enter={logIn} />
{:else}
	<Desktop />
{/if}
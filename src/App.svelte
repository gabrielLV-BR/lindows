<script>
	import Desktop from "./system/Desktop.svelte";
	import LogIn from "./system/login/LoginPage.svelte";

	import { globalVariables } from "./store";
	import { onMount, onDestroy } from "svelte";

	let hasLoggedIn = false;
	let installedApps = [];

	globalVariables.subscribe(newVal => {
		installedApps = newVal.installedApps
	})

	function handleResize(event) {
		globalVariables.set({
			...globalVariables, 
			isMobile: innerWidth < 600
		})
	}

	function logIn() {
		hasLoggedIn = true;
	}


	function mount() {
		window.addEventListener("resize", handleResize)

		if(localStorage['installed-apps']) {
			installedApps = JSON.parse((localStorage['installed-apps']))
			globalVariables.update(val => {
				return {
					...val,
					installedApps
				}
			})
		}

	}

	onMount(mount);
	onDestroy(() => window.removeEventListener("resize", handleResize));
</script>

<!-- Essa página é quem troca entre a tela de login e o Desktop -->

{#if !hasLoggedIn}
	<LogIn enter={logIn} />
{:else}
	<Desktop />
{/if}

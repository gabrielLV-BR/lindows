<script>
	export let name;
</script>

<main>
	<h1>Olá <span class="special">{name}</span>!</h1>
	<p>Visite <a href="https://svelte.dev/tutorial">Svelte</a> para aprender.</p>
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		.special {
			background-image: linear-gradient(
				to right,
				red, 
				orange, 
				yellow , 
				green, 
				blue
			);

			color: transparent;
			background-clip: border-box;
			-webkit-background-clip: text;
		}
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
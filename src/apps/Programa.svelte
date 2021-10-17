<script>
    let items = []
</script>

<button on:click={() => items = [...items, "oi"]}>Adicionar</button>

{#each items as item}
    <p>{item}</p>
{/each}
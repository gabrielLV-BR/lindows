<script>
    import { globalVariables } from "../store";
    function toggleTheme() {
        const theme = document.body.className == "light" ? "dark" : "light";
        document.body.className = theme;
        globalVariables.set({ ...globalVariables, theme })
    }

</script>

<button on:click={toggleTheme}>Mudar tema</button>

<style scoped lang="scss">
    button {
        background: var(--background-color-1);
        color: var(--font-color-1);

        display: block;
        width: 7rem;
        height: 3rem;
        align-self: center;
        margin: auto;
    }
</style>
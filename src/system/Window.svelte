<script>
    export let título = "Janela"

    let offsetX = 0, offsetY = 0;

    let janela = document.createElement('div');

    const mouseDown = (event) => {
        window.addEventListener('mousemove', mouseMove);

        let boundingBox = janela.getBoundingClientRect();

        offsetX = event.clientX - boundingBox.left;
        offsetY = event.clientY - boundingBox.top;
    }   

    const mouseUp = (event) => {
        window.removeEventListener('mousemove', mouseMove);
    }

    const mouseMove = (event) => {
        janela.style.left = `${event.clientX - offsetX}px`;
        janela.style.top = `${event.clientY - offsetY}px`;
    }
</script>

<div class="janela" on:mousedown={mouseDown} on:mouseup={mouseUp} bind:this={janela} >
    <header>
        <!-- Ícone -->
        <span>A</span>
        <!-- Título -->
        <span>{título}</span>
        <!-- Botões de ação -->
        <span>
            <button>-</button>
            <button>[]</button>
            <button>X</button>
        </span>
    </header>
    <main></main>
</div>

<style lang="scss">
    .janela {
        position: absolute;
        left: 33%;
        top: 33%;

        width: 500px;
        height: 500px;

        background: #545454;
        border-radius: 10px;

        header {
            border-radius: 9px 9px 0 0;

            user-select: none;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 5px;

            span > button {
                cursor: pointer;

                border: none;
                display: inline-block;

                width: 1.5rem;
                height: 1.5rem;

                margin: 0;
                padding: 0;
            }

            span > button:hover {
                background-color: #454545;
            }

            cursor: move;
            background: #242424;

            height: 2rem;
        }

    }
</style>
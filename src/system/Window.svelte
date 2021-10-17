<script>
    import { createEventDispatcher } from 'svelte';

    export let título = "Janela";
    export let id;
    export let App;

    // Um 'eventDispatcher' é uma função que nos permite enviar eventos de um componente pra outro,
    // o que facilita a comunicação entre componentes
    const dispatch = createEventDispatcher();

    let offsetX = 0, offsetY = 0;

    let janela = document.createElement('div');

    // Botões da janela

    const fechar = () => {
        dispatch('message', { action: 'close', id });
    }

    const minimizar = () => {
        dispatch('message', { action: 'minimize', id });
    }

    const maximizar = () => {
        // Fazer algo aqui lol
        return
    }

    // Movimentação da janela

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

    // Etc.

    const handleResize = (event) => {
        return;
    }
</script>

<div class="janela" bind:this={janela} on:resize={handleResize} >
    <header on:mousedown={mouseDown} on:mouseup={mouseUp}>
        <!-- Ícone -->
        <span>A</span>
        <!-- Título -->
        <span>{título}</span>
        <!-- Botões de ação -->
        <span>
            <button on:click={minimizar}>_</button>
            <button on:click={maximizar}>[⠀]</button>
            <button on:click={fechar}>X</button>
        </span>
    </header>
    <main>
        <svelte:component this={App} />
    </main>
</div>

<style scoped lang="scss">
    .janela {
        position: absolute;
        left: 33%;
        top: 33%;

        width: 500px;
        height: 500px;

        resize: both;

        background: #545454;
        
        $border: 10px;
        
        border-radius: $border;
        header {
            border-radius: $border $border 0 0;
            height: 2rem;
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
                color: #fff;
            }

            cursor: move;
            background: #242424;
        }

        main {
            width: 100%;
            height: calc(100% - 2rem);
            overflow: auto;

            border-radius: 0 0 $border $border;
        }

    }
</style>
<script>
  import { createEventDispatcher } from "svelte";

  export let titulo;
  export let id;
  export let App;
  export let focused;

  let maximizada = false;

  // Um 'eventDispatcher' é uma função que nos permite enviar eventos de um componente pra outro,
  // o que facilita a comunicação entre componentes
  const dispatch = createEventDispatcher();

  let offsetX = 0,
    offsetY = 0;

  let janela = document.createElement("div");

  // Botões da janela

  const focar = () => {
    dispatch("message", { action: "focus", id });
  };

  const fechar = () => {
    dispatch("message", { action: "close", id });
  };

  const minimizar = () => {
    dispatch("message", { action: "minimize", id });
  };

  let boundingBoxAnterior = null;

  const maximizar = () => {
    if (maximizada) {
      // Remover o "style" efetivamente reseta as mudanças feitas por código
      janela.style.left = `${boundingBoxAnterior.x}px`;
      janela.style.top = `${boundingBoxAnterior.y}px`;
      janela.style.width = `${boundingBoxAnterior.width}px`;
      janela.style.height = `${boundingBoxAnterior.height}px`;
    } else {
      // O boundingBox é um objeto com dados sobre tamanho e posição do elemento
      boundingBoxAnterior = janela.getBoundingClientRect();

      janela.style.left = "0px";
      janela.style.top = "0px";
      janela.style.width = "100vw";
      janela.style.height = "100vh";
    }
    maximizada = !maximizada;
  };

  // Movimentação da janela

  const mouseDown = (event) => {
    window.addEventListener("mousemove", mouseMove);

    let boundingBox = janela.getBoundingClientRect();

    offsetX = event.clientX - boundingBox.left;
    offsetY = event.clientY - boundingBox.top;
  };

  const mouseUp = (event) => {
    window.removeEventListener("mousemove", mouseMove);
  };

  const mouseMove = (event) => {
    janela.style.left = `${event.clientX - offsetX}px`;
    janela.style.top = `${event.clientY - offsetY}px`;
  };

  // Etc.

  const handleResize = (event) => {
    return;
  };
</script>

<div
  class="janela"
  class:focused
  on:mousedown={focar}
  bind:this={janela}
  on:resize={handleResize}
>
  <header on:mousedown={mouseDown} on:dblclick={maximizar} on:mouseup={mouseUp}>
    <!-- Ícone -->
    <span>A</span>
    <!-- Título -->
    <span>{titulo}</span>
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

<style lang="scss">

  .focused {
    z-index: 2;
  }

  .janela {
    position: absolute;
    left: 33%;
    top: 33%;

    width: 500px;
    height: 500px;

    transition: width 100ms, height 100ms;

    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);

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
      background: #242424;

      cursor: grab;

      span {
        color: white;
      }

      span > button {
        cursor: pointer;

        border: none;
        display: inline-block;

        width: 1.5rem;
        height: 1.5rem;

        margin: 0;
        padding: 0;

        // Só por enquanto
        background: none;
        border: 1px solid rgba(200, 200, 200, 0.1);
        color: white;
        font-weight: bold;
      }

      span > button:hover {
        background-color: #454545;
        color: #fff;
      }
    }

    main {
      width: 100%;
      height: calc(100% - 2rem);
      overflow: auto;

      border-radius: 0 0 $border $border;

      &,
      * {
        user-select: none;
      }
    }
  }
</style>

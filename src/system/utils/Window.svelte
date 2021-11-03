<!-- 
  O Window é o rseponsável pela manipulação da janela
  e pela transmissão de mensagens da mesma 
-->
<script>
  import { createEventDispatcher } from "svelte";
  import { globalVariables } from "../../store";

  export let app;
  export let id;
  export let name;
  export let image = "../res/images/logo3.png";
  export let focused = false;
  export let minimized = false;

  let maximized = false;
  let closing = false;
  let isMobile = false;

  globalVariables.subscribe((newVal) => {
    isMobile = newVal.isMobile;
  });

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
    minimized = false;
    closing = true;
    setTimeout(() => {
      dispatch("message", { action: "close", id });
    }, 400);
  };

  const minimizar = () => {
    dispatch("message", { action: "minimize", id });
  };

  let boundingBoxAnterior = null;

  const maximizar = () => {
    if (maximized) {
      // Resetamos para os valores anteriores
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
    maximized = !maximized;
  };

  // Movimentação da janela

  const mouseDown = (event) => {
    window.addEventListener("mousemove", mouseMove);

    let boundingBox = janela.getBoundingClientRect();

    // Calculamos offset do canto superior esquerdo do elemento
    offsetX = event.clientX - boundingBox.left;
    offsetY = event.clientY - boundingBox.top;
  };

  const mouseUp = (event) => {
    window.removeEventListener("mousemove", mouseMove);
  };

  const mouseMove = (event) => {
    // Settamos a posição da janela para a do mouse - o offset
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
  class:minimized
  class:closing
  class:isMobile
  bind:this={janela}
  on:mousedown={focar}
  on:resize={handleResize}
>
  {#if !isMobile}
    <header
      on:mousedown={mouseDown}
      on:dblclick={maximizar}
      on:mouseup={mouseUp}
    >
      <!-- Ícone -->
      <span class="icon">
        <img src={image} alt="Ícone" />
      </span>
      <!-- Título -->
      <span>{name}</span>
      <!-- Botões de ação -->
      <span>
        <button class="btn-window" id="btn-min" on:click={minimizar} />
        <button class="btn-window" id="btn-max" on:click={maximizar} />
        <button class="btn-window" id="btn-cls" on:click={fechar} />
      </span>
    </header>
  {/if}
  <main>
    <svelte:component this={app} {maximized} />
  </main>
</div>

<style scoped lang="scss">
  // Animações
  @keyframes minimize {
    to {
      transform: translate3d(0, 100vh, 0) scale(0.2);
    }
  }

  @keyframes showup {
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  @keyframes closing {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    70% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0);
    }
  }

  //

  .minimized {
    animation: minimize 400ms ease forwards !important;
  }

  .closing {
    animation: closing 300ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards !important;
  }

  .focused {
    z-index: 10;
  }

  .icon {
    border-radius: 5px;
    background: var(--background-1);

    width: 1.3rem;
    height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 1rem;
      height: 1rem;
    }
  }

  .janela {
    position: absolute;
    left: calc(50% - 250px);
    top: calc(50% - 250px);

    // estou usando o translate3D porque li na internet que ele utiliza a placa de vídeo pra calcular,
    // o que o torna mais rápido
    transform: translate3d(0, 0, 0) scale(0.2);

    width: 500px;
    height: 500px;

    transition: width 100ms, height 100ms;
    animation: showup 200ms ease forwards;

    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);

    resize: both;

    background: var(--background-0);

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
      background: var(--background-1);

      span {
        color: var(--font-color-1);
      }

      span > .btn-window {
        cursor: pointer;

        display: inline-block;

        width: 1.2rem;
        height: 1.2rem;

        border-radius: 50%;

        margin: 0;
        padding: 0;

        background: var(--background-1);
        color: var(--font-color-1);
      }

      span > button:hover {
        filter: brightness(1.05);
      }
      span > #btn-max {
        background-color: #34c949;
        border: 1px solid #219a30;
      }
      span > #btn-min {
        background-color: #fcbf42;
        border: 1px solid #df9a33;
      }
      span > #btn-cls {
        background-color: #fb625d;
        border: 1px solid #ea3641;
      }
    }

    main {
      width: 100%;
      height: calc(100% - 2rem);
      overflow: auto;

      display: flex;

      border-radius: 0 0 $border $border;

      &,
      * {
        user-select: none;
      }
    }

  }
  .isMobile {
    header {
      display: none;
    }

    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
  }
</style>

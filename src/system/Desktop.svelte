<!-- 
  O Desktop é a página inicial, ele é responsável por gerenciar as
  janelas abertas e seus ícones na barra de tarefas.
-->


<script>
  // Vai ser utilizado para atribuir um id único para cada "processo"
  import { v1 as uuid } from "uuid";

  import Window from "./utils/Window.svelte";
  import Icon from "./utils/Icon.svelte";
  import StartMenu from "./StartMenu.svelte";
  import Time from "./utils/Time.svelte";

  import Programas, { findProgram } from "../Apps";

  let menuInicialAberto = false;

  let aplicativosAbertos = [];
  let iconesDoDesktop = [...Programas];

  // Funções
  const launch = (id) => {
    // Executa o aplicatico cujo ID == id
    aplicativosAbertos = [
      ...aplicativosAbertos,
      {
        // A função findProgram vêm do Apps.js e retorna o programa
        // com o mesmo id
        ...findProgram(id),
        // Adicionamos um número globalmente aleatório para deixarmos
        // cada processo único
        id: `${id}-${uuid()}`,
        minimized: false,
        focused: false,
      },
    ];
  };

  const handleClickStart = () => {
    menuInicialAberto = !menuInicialAberto;
  };

  const handleMessage = (message) => {
    const aplicativo = aplicativosAbertos.find(
      (app) => app.id === message.detail.id
    );

    // Lidamos com as diferentes mensagens que podem ser enviadas
    // pelas janelas

    if (aplicativo != -1) {
      // O "minimize" é tratado fora pois se não iríamos iterar duas vezes pelo aplicativosAbertos
      if (message.detail.action === "minimize") {
        toggleMinimize(aplicativo.id);
        return;
      }

      switch (message.detail.action) {
        case "close":
          aplicativosAbertos = aplicativosAbertos.filter(
            (app) => app.id !== aplicativo.id
          );
          break;
        case "focus":
          aplicativosAbertos = aplicativosAbertos.map((app) => {
            if (app.id === aplicativo.id) {
              return { ...app, focused: true };
            }
            return { ...app, focused: false };
          });
      }
    }
  };

  const toggleMinimize = (id) => {
    aplicativosAbertos = aplicativosAbertos.map((app) => {
      if (app.id === id) {
        return { ...app, minimized: !app.minimized };
      }
      return app;
    });
  };
</script>

<div class="tela">
  <main class="área-de-trabalho">
    <!-- Esse "each" é um "for in" loop -->
    {#each iconesDoDesktop as icone}
      <!-- 
        Podemos passar valores e funções para os componentes,
        chamadas de propriedades
      --> 

      <Icon
        desktop
        name={icone.name}
        image={icone.image}
        onDoubleClick={() => launch(icone.id)}
      />
    {/each}
    {#each aplicativosAbertos as app (app.id)}
      <Window
        on:message={handleMessage}
        {...app}
      />
    {/each}
  </main>
  <!-- 
    Esse footer atua como um 'wrapper' para que a barra de tarefas
    apareça no hover 
  -->
  <footer class="barra-de-tarefas-wrapper">
    <div class="barra-de-tarefas" class:menuInicialAberto>
      {#if menuInicialAberto}
        <StartMenu handleClickOutside={() => menuInicialAberto = false} {launch} apps={iconesDoDesktop} />
      {/if}
      <button class="início" on:click={handleClickStart}>
        <img src="res/images/logo2.png" alt="Botão do início" />
      </button>
      <span class="aplicativos-abertos">
        {#each aplicativosAbertos as app (app.id)}
          <Icon
            taskbar={true}
            name={app.name}
            image={app.image}
            onClick={() => toggleMinimize(app.id)}
          />
        {/each}
      </span>
      <Time />
    </div>
  </footer>
</div>

<!-- Usamos scss no projeto para agilizarmos a escrita do código -->
<style lang="scss">
  .tela {
    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 100vh;
    margin: 0;

    background-image: url("../res/images/wallpaper2.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .área-de-trabalho {
    padding: 1rem;
    flex: 2;
  }

  .barra-de-tarefas-wrapper {
    position: relative;
    display: block;

    z-index: 15;
    width: 100vw;

    &:hover > .barra-de-tarefas,
    .barra-de-tarefas.menuInicialAberto {
      transform: translateY(-15px);
      transition: transform 100ms ease-out;
    }

    .barra-de-tarefas {
      &,
      .aplicativos-abertos {
        display: flex;
        flex-direction: row;
        align-items: center;

        gap: 1rem;
      }

      padding: 0 1rem;

      .aplicativos-abertos {
        max-width: 80%;
        overflow: hidden;
      }

      display: block;
      margin: 0 auto;

      transform: translateY(100%);
      transition: transform 200ms ease-out;

      justify-content: space-between;

      height: 3.5rem;
      width: 80%;
      border-radius: 7px;

      z-index: 15;

      background-color: var(--background-1);
      opacity: 0.7;

      box-shadow: 0 0 2px var(--background-0) inset;

      .início {
        height: 2.8rem;
        width: 2.8rem;
        background: none;

        margin: 0 0.5rem 0 0.2rem;

        &:hover {
          transform: rotate(360deg);
          transition: 0.4s;
        }
        transition: 0.4s;
        & > img {
          width: 100%;
        }
      }
    }
  }
</style>

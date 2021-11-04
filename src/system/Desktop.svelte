<!-- 
  O Desktop é a página inicial, ele é responsável por gerenciar as
  janelas abertas e seus ícones na barra de tarefas.
-->
<script>
  // Vai ser utilizado para atribuir um id único para cada "processo"
  import { v1 as uuid } from "uuid";

  import { globalVariables } from "../store";

  import Window from "./utils/Window.svelte";
  import Icon from "./utils/Icon.svelte";
  import StartMenu from "./StartMenu.svelte";
  import Time from "./utils/Time.svelte";
  import Calendario from "./utils/Calendario.svelte";

  import { findProgram } from "../Apps";

  let calendarioAberto = false;
  let menuInicialAberto = false;
  let aplicativosAbertos = [];
  export let iconesDoDesktop = [];

  globalVariables.subscribe((newVal) => {
    iconesDoDesktop = newVal.installedApps;
  });

  // Funções
  const launch = (id) => {
    // Executa o aplicatico cujo ID == id
    aplicativosAbertos = [
      ...aplicativosAbertos.map((app) => {
        return { ...app, focused: false };
      }),
      {
        // A função findProgram vêm do Apps.js e retorna o programa
        // com o mesmo id
        ...findProgram(id),
        // Adicionamos um número globalmente aleatório para deixarmos
        // cada processo único
        id: `${id}-${uuid()}`,
        minimized: false,
        focused: true,
      },
    ];
  };

  const handleClickTime = () => {
    calendarioAberto = !calendarioAberto;
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

  let dark = document.body.className == "dark";

  globalVariables.subscribe((newVal) => {
    dark = newVal.theme === "dark";
  });

  const minimizeAll = () => {
    aplicativosAbertos = aplicativosAbertos.map((app) => {
      return { ...app, minimized: true };
    });
  };

  const closeFocused = () => {
    aplicativosAbertos = aplicativosAbertos.filter((app) => !app.focused);
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
      <Window on:message={handleMessage} {...app} />
    {/each}
  </main>
  <!-- 
    Esse footer atua como um 'wrapper' para que a barra de tarefas
    apareça no hover 
  -->
  <footer class="barra-de-tarefas-wrapper">
    <div
      class="barra-de-tarefas"
      class:menuInicialAberto
      class:calendarioAberto
    >
      {#if menuInicialAberto}
        <StartMenu
          handleClickOutside={() => (menuInicialAberto = false)}
          {launch}
          apps={iconesDoDesktop}
        />
      {/if}
      {#if calendarioAberto}
        <Calendario handleClickOutside={() => (calendarioAberto = false)} />
      {/if}
      <button class="início" on:click={handleClickStart}>
        <img
          src="res/images/logo2.png"
          alt="Botão do início"
          id="img-home-button"
          class:dark
        />
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
      <span class="time">
        <Time onClick={handleClickTime} />
      </span>
    </div>
  </footer>
  <!-- 
    Só aparece se a tela estiver muito pequena, para emular um
    celular 
  -->
  <footer class="cellphone-buttons">
    <img
      on:click={minimizeAll}
      src="../res/images/home.svg"
      alt="Voltar ao início"
    />
    {#if aplicativosAbertos.length > 0}
      <img on:click={closeFocused} src="../res/images/close.svg" alt="Fechar" />
    {/if}
  </footer>
</div>

<!-- Usamos scss no projeto para agilizarmos a escrita do código -->
<style lang="scss">
  .dark {
    filter: invert(1);
  }
  .tela {
    overflow: auto;

    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 100vh;
    margin: 0;

    background-image: var(--background-desktop);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .área-de-trabalho {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: flex-start;

    max-height: 90vh;
    padding: 1rem;
    flex: 2;
  }

  .barra-de-tarefas-wrapper {
    position: absolute;
    bottom: 0;

    display: block;

    z-index: 15;
    width: 100vw;

    &:hover > .barra-de-tarefas,
    .barra-de-tarefas.menuInicialAberto,
    .barra-de-tarefas.calendarioAberto {
      transform: translateY(-15px);
      transition: transform 100ms ease-out;
    }

    .barra-de-tarefas {
      &,
      .aplicativos-abertos {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 1rem;
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

      z-index: 15;

      background-color: var(--background-1);
      opacity: 0.7;

      box-shadow: 0 0 2px var(--background-0) inset;

      .início {
        height: 2.9rem;
        width: 2.9rem;
        background: none;

        margin: 0 0.5rem 0 0.2rem;

        &:hover {
          transform: scale(1.1);
          transition: 0.2s;
        }
        transition: 0.2s;
        & > img {
          width: 100%;
        }
      }
    }
  }

  .cellphone-buttons {
    position: fixed;
    display: none;

    bottom: 0;
    right: 0;
    width: 90vw;
    height: 4rem;

    background: rgba(0, 0, 0, 0.5);

    z-index: 16;
  }

  @media screen and (max-width: 599px) {
    .cellphone-buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      gap: 1rem;

      img {
        filter: invert(1);
        width: 3rem;
      }
    }

    .tela {
      margin-left: 10vw;
    }

    .time {
      width: 250px;
      transform: rotate(90deg);
    }

    .barra-de-tarefas-wrapper {
      left: 0;
      top: 0;

      width: 10vw;
      height: 100vh;

      margin: 0;
      padding: 0;

      &:hover > .barra-de-tarefas,
      .barra-de-tarefas.menuInicialAberto,
      .barra-de-tarefas.calendarioAberto {
        transform: translateY(0px);
      }

      .barra-de-tarefas {
        transform: translateY(0px);
        align-items: center;

        opacity: 1;
        border-radius: 0;

        margin: 0;
        padding: 0;
        flex-direction: column;

        height: 100%;
        width: 100%;
      }
    }

    .time {
      transform: rotate(90deg);
    }
  }
</style>

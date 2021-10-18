<script>
  import { v1 as uuid } from "uuid";

  import Window from "./utils/Window.svelte";
  import Icon from "./utils/Icon.svelte";
  //
  import Programas, { findProgram } from "../Apps";
  //

  let aplicativosAbertos = [];

  let iconesDoDesktop = [...Programas];

  // Funções

  const launch = (id) => {
    // Executa o aplicatico cujo ID == id
    aplicativosAbertos = [
      ...aplicativosAbertos,
      {
        ...findProgram(id),
        id: `${id}-${uuid()}`,
        minimized: false,
        focused: false,
      },
    ];
  };

  const handleClickStart = () => {
    alert("Você clicou em mim");
  };

  const handleMessage = (message) => {
    const aplicativo = aplicativosAbertos.find(
      (app) => app.id === message.detail.id
    );

    if (aplicativo != -1) {
      switch (message.detail.action) {
        case "close":
          aplicativosAbertos = aplicativosAbertos.filter(
            (app) => app.id !== aplicativo.id
          );
          break;
        case "minimize":
          toggleMinimize();
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
    const aplicativo = aplicativosAbertos.find((app) => app.id === id);

    if (aplicativo) {
      aplicativosAbertos = aplicativosAbertos.map((app) => {
        if (app.id === aplicativo.id) {
          return { ...app, minimized: !app.minimized };
        }
        return app;
      });
    }
  };
</script>

<div class="tela">
  <main class="área-de-trabalho">
    {#each iconesDoDesktop as icone}
      <Icon
        desktop
        name={icone.name}
        image={icone.image}
        onDoubleClick={() => launch(icone.id)}
      />
    {/each}
    {#each aplicativosAbertos as app (app.id)}
      {#if !app.minimized}
        <Window
          App={app.app}
          on:message={handleMessage}
          title={app.nome}
          id={app.id}
          focused={app.focused}
        />
      {/if}
    {/each}
  </main>
  <!-- Esse footer atua como um 'wrapper' -->
  <footer class="barra-de-tarefas">
    <div>
      <button class="início" on:click={handleClickStart}>
        <img src="res/images/logo.png" alt="Botão do início" />
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
      <span />
    </div>
  </footer>
</div>

<style lang="scss">
  .tela {
    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 100vh;
    margin: 0;

    background-image: url(../res/images/wallpaper.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .área-de-trabalho {
    padding: 1rem;
    flex: 2;
  }

  .barra-de-tarefas {
    position: absolute;
    bottom: 0;
    left: 0;

    z-index: 3;

    display: block;
    width: 100vw;

    &:hover > div {
      transform: translateY(-9px);
      transition: transform 100ms ease-out;
    }

    & > div {
      &,
      .aplicativos-abertos {
        display: flex;
        flex-direction: row;
        align-items: center;

        gap: 1rem;
      }

      display: block;
      margin: 0 auto;

      transform: translateY(100%);
      transition: transform 200ms ease-out;

      justify-content: space-between;

      background-color: rgb(20, 20, 20);
      height: 2.5rem;
      width: 80%;
      border-radius: 5px;

      z-index: 3;

      background-color: #223629;
      opacity: 0.9;

      box-shadow: 0 0 2px white inset;

      .início {
        height: 2.5rem;
        width: 2.5rem;
        background: none;

        margin: 0 0.5rem 0 0.2rem;

        &:hover {
          filter: brightness(1.2);
        }

        & > img {
          width: 100%;
        }
      }
    }
  }
</style>

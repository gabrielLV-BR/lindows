<script>
  import {v1 as uuid} from "uuid";

  import Window from "./utils/Window.svelte";
  import Desktop from "./Desktop.svelte";
  import Cronometro from "../apps/Cronometro.svelte";
  import Icon from "./utils/Icon.svelte";
  //
  import Programas, { findProgram } from "../Apps";
  //

  let aplicativosAbertos = [];

  let iconesDoDesktop = [...Programas];

  // Funções

  const launch = (id) => {
    // Executa o aplicatico cujo ID == id
    aplicativosAbertos = [...aplicativosAbertos, {...findProgram(id), id: `${id}-${uuid()}`}];
    console.log(aplicativosAbertos)
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
            (app) => app !== aplicativo
          );
          alert("Fechou!")
        case "minimize":
          aplicativo.minimized = true;
          aplicativosAbertos = [
            ...aplicativosAbertos.filter((app) => app.id !== aplicativo.id),
            aplicativo,
          ];
      }
    }
  };

  const toggleMinimize = (id) => {
    const aplicativo = aplicativosAbertos.find((app) => app.id === id);

    if (aplicativo) {
      aplicativo.minimized = !aplicativo.minimized;
      aplicativosAbertos = [
        ...aplicativosAbertos.filter((app) => app.id !== aplicativo.id),
        aplicativo,
      ];
    }
  };
</script>

<div class="tela">
  <main class="área-de-trabalho">
    {#each iconesDoDesktop as icone}
      <Icon
        name={icone.name}
        image={icone.image}
        onDoubleClick={() => launch(icone.id)}
      />
    {/each}
    {#each aplicativosAbertos as app}
      {#if !app.minimized}
        <Window
          App={app.app}
          on:message={handleMessage}
          title={app.nome}
          id={app.id}
        />
      {/if}
    {/each}
  </main>
  <footer class="barra-de-tarefas">
    <button class="início" on:click={handleClickStart}>
      <img src="res/images/logo.png" alt="Botão do início" />
    </button>
    <span class="aplicativos-abertos">
      {#each aplicativosAbertos as app}
        <Icon
          name={app.name}
          image={app.image}
          onClick={() => toggleMinimize(app.id)}
        />
      {/each}
    </span>
    <span />
  </footer>
</div>

<style scoped lang="scss">
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
    display: grid;

    padding: 1rem;
    gap: 1rem;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(8, 1fr);

    flex: 2;
  }

  .barra-de-tarefas {
    &,
    & > span {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    justify-content: space-between;

    background-color: rgb(20, 20, 20);
    height: 2.5rem;

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

      img {
        width: 100%;
      }
    }
  }
</style>

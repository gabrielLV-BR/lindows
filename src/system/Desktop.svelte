<script>
  import Window from "./Window.svelte";
  import Programa from "./Programa.svelte";
  import Desktop from "./Desktop.svelte";

  let aplicativosAbertos = [
    {
      id: "chrome",
      nome: "Chrome",
      minimized: false,
      app: Programa
    },
  ];

  const handleMessage = (message) => {
    const aplicativo = aplicativosAbertos.find(
      (app) => app.id === message.detail.id
    );

    if (aplicativo != -1) {
      switch (message.detail.action) {
        case "close":
          aplicativosAbertos = aplicativosAbertos.filter(
            (app) => app.id === aplicativo.id
          );
        case "minimize":
          aplicativo.minimized = true;
          aplicativosAbertos = [
            ...aplicativosAbertos.filter((app) => app.id !== aplicativo.id),
            aplicativo,
          ];
      }
    }
  };

  const maximize = (id) => {
    const aplicativo = aplicativosAbertos.find(
      (app) => app.id === id
    );

    if (aplicativo) {
      aplicativo.minimized = false;
      aplicativosAbertos = [
        ...aplicativosAbertos.filter((app) => app.id !== aplicativo.id),
        aplicativo,
      ];
    }
  };
</script>

<div>
  <main>
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
  <footer>
    {#each aplicativosAbertos as app}
      <div on:click={() => maximize(app.id)}>
        {app.nome}
      </div>
    {/each}
  </footer>
</div>

<style scoped lang="scss">
  footer {
    background-color: white;
    position: absolute;

    bottom: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    display: flex;
    flex-direction: row;
  }
</style>

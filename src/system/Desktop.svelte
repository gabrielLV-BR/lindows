<script>
  // Horario e dia da semana
  var hoje = new Date
  var hora = hoje.getHours()
  var minuto = hoje.getMinutes()
          
  var minutoTexto = `${minuto}`
  if(minuto < 10) {
      minutoTexto = "0" + minutoTexto
  }
  var dias = new Array(
    "Domingo", 
    "Segunda-Feira", 
    "Terça-Feira", 
    "Quarta-Feira", 
    "Quinta-Feira", 
    "Sexta-Feira", 
    "Sábado"
    )

  $: dateText = `${dias[hoje.getDay()]} | ${hora}:${minutoTexto}`

  import { v1 as uuid } from "uuid";

  import Window from "./utils/Window.svelte";
  import Icon from "./utils/Icon.svelte";
  //
  import Programas, { findProgram } from "../Apps";
  import { get } from "svelte/store";
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
    console.log(message);

    const aplicativo = aplicativosAbertos.find(
      (app) => app.id === message.detail.id
    );

    if (aplicativo != -1) {

      // O "minimize" é tratado fora pois se não iríamos iterar duas vezes pelo aplicativosAbertos
      if(message.detail.action === "minimize") {
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
  }

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
      <Window
        on:message={handleMessage}
        App={app.app}

        titulo={app.name}
        id={app.id}

        minimized={app.minimized}
        focused={app.focused}
      />
    {/each}
  </main>
  <!-- Esse footer atua como um 'wrapper' -->
  <footer class="barra-de-tarefas">
    <div>
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
      <span>
        <p class="hora" id="hora">{dateText}</p>
      </span>
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

    background-image: url('../res/images/wallpaper2.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .área-de-trabalho {
    padding: 1rem;
    flex: 2;
  }
  .hora {
      font-weight: bold;
      margin-right: 10px;
  }
  .barra-de-tarefas {
    position: absolute;
    bottom: 0;
    left: 0;

    z-index: 3;

    display: block;
    width: 100vw;

    

    &:hover > div {
      transform: translateY(-15px);
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
      height: 3.5rem;
      width: 80%;
      border-radius: 7px;

      z-index: 3;

      background-color: #d9d9d9;
      opacity: 0.7;

      box-shadow: 0 0 2px white inset;

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

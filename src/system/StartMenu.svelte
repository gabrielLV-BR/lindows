<!-- 
  O StartMenu é um lançador de aplicativos compacto
-->
<script>
  import { clickOutside } from "../modules/clickOutside";
  import { globalVariables } from "../store";
  import { sortByName } from '../Apps';

  // Quando exportamos variáveis, as fazemos disponíveis pra serem
  // passadas como propriedades
  export let launch = (_) => null;
  export let apps = [];
  export let handleClickOutside = (_) => null;

  // Variáveis prefixadas com $: são reativas: elas dependem de um valor
  // de uma variável mutável e ela atualiza de acordo
  $: partitionedApps = partitionApps(apps.sort(sortByName));

  let search = "";

  function partitionApps(apps) {
    let sorted = [];
    let currentLetter = apps[0].name[0] ?? '#';
    let currentAppList = [];

    for (let app of apps) {
      if (app.name[0] !== currentLetter) {
        sorted = [
          ...sorted,
          {
            letter: currentLetter,
            apps: currentAppList,
          },
        ];
        currentAppList = [];
        currentLetter = app.name[0];
      }
      currentAppList = [...currentAppList, app];
    }

    if(sorted == []) return [{letter: '#', apps: []}];

    return sorted;
  }
  let dark = document.body.className == "dark";

  globalVariables.subscribe((newVal) => {
    dark = newVal.theme === "dark";
  });
</script>

<!-- O use: nos permite adicionar eventos customizados -->
<main
  use:clickOutside
  on:click_outside={handleClickOutside}
  class="start-menu isMobile"
>
  <div class="app-list">
    {#if search === ""}
      {#each partitionedApps as appSection (appSection.letter)}
        <span>
          <input
            style="display: none"
            type="checkbox"
            id="checkbox-{appSection.letter}"
          />
          <label for="checkbox-{appSection.letter}" class="partition">
            {appSection.letter}
            <img
              src="../res/icons/arrow.png"
              id="arrow"
              alt=""
              class="after"
              class:dark
            />
          </label>
          <section class="content">
            {#each appSection.apps as app (app)}
              <p on:click={() => launch(app.id)}>
                <img src={app.image} alt="" class:dark />
                {app.name}
              </p>
            {/each}
          </section>
        </span>
      {/each}
    {:else}
      <section>
        {#each apps.filter((a) => a.name
            .toLowerCase()
            .startsWith(search.toLowerCase())) as app (app.id)}
          <p on:click={() => launch(app.id)}>
            <img src={app.image} alt="" class:dark />
            {app.name}
          </p>
        {/each}
      </section>
    {/if}
  </div>

  <!-- 
    Não é recomendado deixar a opção "autofocus" ativa,
    mas ela é a que resolveu o problema mais fácil
  -->
  <input
    autofocus
    class="app-search"
    bind:value={search}
    type="text"
    placeholder="Digite o nome do App"
  />
</main>

<style scoped lang="scss">
  .dark {
    filter: invert(1);
  }
  
  .start-menu {
    opacity: 0.9;

    position: fixed;
    left: 0;
    bottom: 4rem;
    
    background: var(--background-1);
    color: black;
    
    width: 17rem;

    overflow: hidden;
    padding: 0px;
    border-radius: 0.4rem;
  }

  img {
    width: 2rem;
    height: 2rem;
  }
  #arrow {
    width: 1.5rem;
    height: 1.5rem;
  }
  .app-search {
    width: 100%;
    margin: 0;
    outline: none;

    font-size: 1.5rem;

    border-width: 2px;
    border-color: var(--background-1);
    background-color: var(--background-0);
    color: var(--font-color-1);
  }

  .app-list {
    background: black;

    label {
      position: relative;
      width: 100%;
      background: var(--background-0);
      color: var(--font-color-1);

      padding: 0.2rem;
      font-size: 2rem;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .after {
        transition: transform 200ms ease;
      }

      &:hover {
        filter: brightness(1.1);
      }
    }

    input[type="checkbox"]:checked ~ label > .after {
      transform: rotate(270deg);
    }

    input[type="checkbox"]:checked ~ section {
      max-height: 200px;
      transition: max-height 200ms;
    }

    input[type="checkbox"] ~ section {
      max-height: 0px;
    }

    section {
      background: var(--background-2);
      height: 100%;
      overflow: hidden;
      transition: max-height 200ms;

      p {
        display: flex;
        background: var(--background-2);
        margin: 0;
        padding: 0.2rem 0;
        font-size: 1.6rem;
        user-select: none;
      }

      p:hover {
        filter: brightness(1.3);
      }
    }
  }

  @media screen and (max-width: 600px) {
    .start-menu {
      left: 4.5rem;
      top: 0.3rem;
      bottom: unset;
    }
  }
</style>
<script>
  import { clickOutside } from "../modules/clickOutside";

  export let launch = (_) => null;
  export let apps = [];
  export let handleClickOutside = (_) => null;

  $: partitionedApps = partitionApps(apps);

  let search = "";

  function partitionApps(apps) {
    let sorted = [];
    let currentLetter = apps[0].name[0];
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
    return sorted;
  }
</script>

<main use:clickOutside on:click_outside={handleClickOutside} class="start-menu">
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
            <img src="../res/images/arrow.svg" alt="" class="after">
          </label>
          <section class="content">
            {#each appSection.apps as app (app)}
              <p on:click={() => launch(app.id)}>
                <img src={app.image} alt="" />
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
            <img src={app.image} alt="" />
            {app.name}
          </p>
        {/each}
      </section>
    {/if}
  </div>

  <input
    autofocus
    class="app-search"
    bind:value={search}
    type="text"
    placeholder="Digite o nome do App"
  />
</main>

<style scoped lang="scss">
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
    margin: 0 0.8rem;
    width: 1rem;
  }

  .app-search {
    width: 100%;
    margin: 0;
    outline: none;

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
      font-size: 1.5rem;

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
      transform: rotate(180deg);
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
        background: var(--background-2);
        margin: 0;
        padding: 0.2rem 0;
        user-select: none;
      }

      p:hover {
        filter: brightness(1.3);
      }
    }
  }
</style>

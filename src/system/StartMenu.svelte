<script>
  export let launch = (_) => null;
  export let apps = [];
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

<main class="start-menu">
  <div class="app-list">
    <span>
      {#each partitionedApps as appSection (appSection.letter)}
        <input
          style="display: none"
          type="checkbox"
          id="checkbox-{appSection.letter}"
        />
        <label for="checkbox-{appSection.letter}" class="partition">
          {appSection.letter}
        </label>
        <section class="content">
          {#each appSection.apps as app (app)}
            <p on:click={() => launch(app.id)}>
              {app.name}
            </p>
          {/each}
        </section>
      {/each}
    </span>
  </div>
  <input
    class="app-search"
    bind:value={search}
    type="text"
    placeholder="Digite o nome do App"
  />
</main>

<style lang="scss">
  .start-menu {
    margin-bottom: 2rem;
    position: absolute;
    left: 1rem;
    bottom: 3rem;

    overflow: hidden;

    background: #d6d6d6;
    color: black;

    padding: 0px;
    border-radius: 0.4rem;
  }

  .app-search {
    width: 100%;
    margin: 0;
  }

  .app-list {
    label {
      position: relative;
      width: 100%;
      background: #202020;
      color: white;

      padding: 0.2rem;
      font-size: 1.5rem;

      &:hover {
        background: #303030;
      }

      &::after {
        content: "";

        position: absolute;
        top: 50%;
        right: 0.5rem;

        display: inline-block;
        width: 20px;
        height: 20px;

        transform: translateY(-50%) rotate(00deg);

        background-image: url(../res/images/arrow.svg);
        background-repeat: no-repeat;

        transition: transform 200ms ease;
      }
    }

    input[type="checkbox"]:checked ~ label::after {
      transform: translateY(-50%) rotate(180deg);
    }

    input[type="checkbox"]:checked ~ section {
      max-height: 400px;
      transition: max-height 200ms;
    }

    section {
      background: #d6d6d6;
      height: 100%;
      max-height: 0px;
      overflow: hidden;
      transition: max-height 200ms;
      p {
        margin: 0;
        padding: 0.2rem 0;
        user-select: none;
      }

      p:hover {
        background: #b6b6b6;
      }
    }
  }
</style>

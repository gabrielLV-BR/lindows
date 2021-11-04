<script>
  import Programas, { findProgram } from "../Apps";

  import { globalVariables } from "../store";

  let isDark = false;
  let downloading = false;

  let alreadyInstalledApps = [];

  globalVariables.subscribe((newVal) => {
    isDark = newVal.theme === "dark";
  });

  globalVariables.update((val) => {
    alreadyInstalledApps = val.installedApps;
    return val;
  });

  let downloadingApps = new Map();

  alreadyInstalledApps.forEach((alreadyInstalledApp) => {
    downloadingApps.set(alreadyInstalledApp.id, 1);
  });

  function uninstall(id) {
    if (id == "config" || id == "navegador") return;

    downloadingApps = new Map(downloadingApps.set(id, undefined));
    globalVariables.update((val) => {
      const newInstalledApps = val.installedApps.filter((app) => app.id != id);

      localStorage["installed-apps"] = JSON.stringify(newInstalledApps);

      return {
        ...val,
        installedApps: newInstalledApps,
      };
    });
  }

  function download(id) {
    if (downloadingApps.get(id) != undefined) return;

    downloadingApps = new Map(downloadingApps).set(id, 0);
    setTimeout(() => {
      downloadingApps = new Map(downloadingApps).set(id, 1);
      globalVariables.update((val) => {
        const newInstalledApps = [...val.installedApps, findProgram(id)];

        localStorage["installed-apps"] = JSON.stringify(newInstalledApps);

        return {
          ...val,
          installedApps: newInstalledApps,
        };
      });
    }, 2000);
  }
</script>

<div class="browser">
  <input type="radio" name="tab" id="a" checked />
  <input type="radio" name="tab" id="b" />
  <input type="radio" name="tab" id="c" />
  <input type="radio" name="tab" id="d" />

  <header class="tabs">
    <label for="a"> Plays Store&reg; </label>
    <label for="b"> TeuTubo&reg; </label>
    <label for="c"> Melhor site </label>
    <label for="e" class="add">
      <img src="../res/images/close.svg" alt="Fechar" />
    </label>
  </header>
  <main class="content">
    <section class="a">
      <h1>Plays Tore&reg;</h1>
      <h2>Tendências do momento!</h2>
      <article>
        {#each Programas as programa (programa.id)}
          <div
            class="programa {downloadingApps.get(programa.id) == 0 &&
              'downloading'}"
            id={programa.id}
          >
            <img src={programa.image} alt={programa.name} class:isDark />
            <p>{programa.name}</p>
            {#if downloadingApps.get(programa.id) == 1 || programa.id == "config" || programa.id == "navegador"}
              <p
                on:click={() => uninstall(programa.id)}
                class="download-info download-complete {(programa.id ==
                  'config' ||
                  programa.id == 'navegador') &&
                  'no'}"
              >
                <span class="img" />
                <!-- <img src="../res/images/check.svg" alt="App Baixado" /> -->
              </p>
            {:else}
              <button
                class="download-info"
                on:click={() => download(programa.id)}
                >{downloadingApps.get(programa.id) == 0
                  ? "BAIXANDO..."
                  : "BAIXAR"}</button
              >
            {/if}
          </div>
        {/each}
      </article>
    </section>
    <section class="b" />
    <section class="c" />
  </main>
</div>

<style scoped lang="scss">
  .a {
    background: var(--background-2);

    height: 100%;

    h1 {
      font-size: 4rem;
      margin: 0.5rem;
      color: var(--font-color-1);
      border-bottom: 1px solid;
      padding-bottom: 0.5rem;
    }

    h2 {
      font-size: 2rem;
      color: var(--font-color-1);
    }

    article {
      padding: 0 0.5rem;
      display: flex;
      flex-direction: row;
      gap: 0.91rem;
      flex-wrap: wrap;
    }

    .programa {
      position: relative;

      width: 7rem;
      height: 11rem;

      overflow: hidden;
      text-overflow: ellipsis;

      background: var(--background-0);
      border-radius: 1rem;

      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        margin: 0.6rem;
        width: 70%;
      }

      p {
        color: var(--font-color-1);
      }

      .download-info {
        position: absolute;

        bottom: 0;
        left: 0;
        width: 100%;

        margin: 0;

        color: var(--background-2);
        background-color: var(--background-2-inverse);
        cursor: pointer;
      }

      .download-complete {
        background: rgb(0, 200, 30);
      }

      .download-complete:hover {
        background: rgb(200, 20, 0);

        .img {
          background-image: url(../res/images/close.svg);
          background-repeat: no-repeat;
        }
      }

      .no:hover {
        background: rgb(228, 228, 9) !important;
        cursor: not-allowed;
      }

      .download-complete .img {
        background-image: url(../res/images/check.svg);

        display: block;
        width: 25px;
        height: 2rem;

        filter: invert(1);
        margin: auto;
      }

      button::after {
        position: absolute;
        z-index: 3;

        left: 0;
        bottom: 0;
        width: 100%;
        height: 2rem;
        background: green;
      }
    }
  }

  img.isDark {
    filter: invert(1);
  }

  /* Global */
  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-content: center;

    margin: 0 auto;

    gap: 5px;

    position: relative;

    background-color: var(--background-0);

    height: 40px;
  }

  .browser,
  .content {
    width: 100%;
    height: 100%;
  }

  .content {
    background-color: var(--background-1);

    height: calc(100% - 40px);
    margin: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Guias */

  header {
    label:hover {
      background-color: var(--background-2);
      transition: background-color 100ms ease;
    }

    label {
      position: relative;

      cursor: pointer;

      display: inline-block;
      white-space: nowrap;

      min-width: 20%;
      width: fit-content;
      max-width: 30%;
      height: fit-content;

      font-size: 0.9rem;

      overflow: hidden;
      text-overflow: ellipsis;

      margin: auto 0;

      background-color: var(--background-1);
      color: var(--font-color-1);

      border-radius: 6px;
      padding: 8px;

      transition: background-color 100ms ease;

      position: relative;

      padding-left: 26px;
      padding-right: 20px;
    }
  }
  .add {
    padding: 7px;
    max-width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 20px;
      height: 20px;

      transform: rotate(45deg);
    }
  }

  .tabs {
    label::before,
    label::after {
      content: "";
      display: inline-block;

      position: absolute;

      top: 50%;

      transform: translateY(-40%);

      width: 15px;
      height: 15px;

      background-size: cover;
    }

    label:not(:last-of-type)::before {
      left: 7px;
      background-image: url(../res/images/world.svg);
    }
  }

  input#a:checked ~ header label[for="a"]::after,
  input#b:checked ~ header label[for="b"]::after,
  input#c:checked ~ header label[for="c"]::after,
  input#d:checked ~ header label[for="d"]::after {
    right: 7px;

    transform: translateY(-40%);

    background-color: var(--browser-gray);

    background-image: url(images/close.svg);
    background-size: contain;
  }

  /* CSS para as Guias */

  section,
  input#a,
  input#b,
  input#c,
  input#d {
    display: none;
  }

  input#a:checked ~ main section.a,
  input#b:checked ~ main section.b,
  input#c:checked ~ main section.c,
  input#d:checked ~ main section.d {
    width: 100%;
    height: 100%;
    display: block;
  }

  input#a:checked ~ header label[for="a"],
  input#b:checked ~ header label[for="b"],
  input#c:checked ~ header label[for="c"],
  input#d:checked ~ header label[for="d"] {
    background-color: var(--background-1);
    filter: brightness(0.7);
    z-index: 2;
  }
</style>

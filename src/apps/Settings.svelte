<script>
  import { globalVariables } from "../store";
  let themeText = "LIGHT";
  let Tela = document.querySelector(".tela");
  // toggle significa alternar em inglês
  // se o tema ta escuro troca para claro, e se esta claro troca para escuro
  function toggleTheme() {
    const theme = document.body.className == "light" ? "dark" : "light";
    document.body.className = theme;

    globalVariables.update(val => {
      return {
        ...val,
        theme
      }
    })

    themeText = document.body.className.toUpperCase();
  }
  function changeWallpaper(imgNum) {
    document.body.style.setProperty(
      "--background-desktop",
      `url(../res/images/wallpaper${imgNum}.jpg)`
    );
  }
  function changeFont(font) {
    document.body.style.setProperty("--system-font", `${font}`);
  }

  function reset() {
    localStorage.clear();
    location.reload();
  }

</script>

<ul>
  <li>
    <p on:click={toggleTheme} id="toggleTheme"
      >Mudar o tema: {themeText}</p
    >
  </li>
  <li>
    <p class="titleConfig">Wallpapers:</p>
    <div class="allWallpapers">
      <img
        src="../res/images/wallpaper1.jpg"
        on:click={() => changeWallpaper(1)}
        alt="Background"
      />
      <img
        src="../res/images/wallpaper2.jpg"
        on:click={() => changeWallpaper(2)}
        alt="Background"
      />
      <img
        src="../res/images/wallpaper3.jpg"
        on:click={() => changeWallpaper(3)}
        alt="Background"
      />
      <img
        src="../res/images/wallpaper4.jpg"
        on:click={() => changeWallpaper(4)}
        alt="Background"
      />
      <img
        src="../res/images/wallpaper5.jpg"
        on:click={() => changeWallpaper(5)}
        alt="Background"
      />
      <img
        src="../res/images/wallpaper6.jpg"
        on:click={() => changeWallpaper(6)}
        alt="Background"
      />
    </div>
  </li>
  <li>
    <p class="titleConfig">Fontes do sistema:</p>
    <div class="allFonts">
      <span
        class="fontes"
        id="fonte1"
        on:click={() =>
          changeFont(
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          )}>Apple System</span
      >
      <span class="fontes" id="fonte2" on:click={() => changeFont("ubuntu")}
        >Ubuntu</span
      >
      <span
        class="fontes"
        id="fonte3"
        on:click={() => changeFont("anonymous pro")}>Anonymous Pro</span
      >
      <span
        class="fontes"
        id="fonte4"
        on:click={() => changeFont("ceviche one")}>Ceviche One</span
      >
      <span
        class="fontes"
        id="fonte5"
        on:click={() => changeFont("dancing script")}>Dancing Script</span
      >
    </div>
  </li>
  <li>
    <p on:click={reset} class="reset"
      >Formatar Computador (IRREVERSÍVEL)</p
    >
  </li>
</ul>

<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  ul {
    width: 100%;
    list-style: none;
    &,
    li {
      padding: 1rem 2rem;
    }
  }

  .allWallpapers {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  #toggleTheme {
    background-color: var(--background-1);
    color: var(--font-color-1);
    text-align: center;
    width: auto;
    padding: 1rem;
    border-radius: 0.7rem;
  }
  .reset {
    background-color: var(--error);
    color: #fff;
    text-align: center;
    width: auto;
    border-radius: 0.7rem;
    padding: 1rem;
    margin: 1.5rem 0 1.5rem 0;
    cursor: pointer;
  }
  .titleConfig {
    width: auto;
    padding: 0.7rem;
    text-align: center;
    background-color: var(--background-1);
    color: var(--font-color-2);
    border-radius: 0.7rem;
  }

  img {
    width: 10rem;
    border-radius: 0.5rem;
    // padding em 'rem' desregula o border-radius da img
    padding: 3px;
    filter: brightness(0.9);
    &:hover {
      cursor: pointer;
      filter: brightness(1.1);
    }
  }
  .allFonts {
    display: flex;
    flex-direction: column;
  }
  .fontes {
    width: 80%;
    border-radius: 0.5rem;
    background-color: var(--background-0);
    color: var(--font-color-1);
    padding: 0.5rem;
    margin: 0.2rem auto;
    border: 1px solid var(--background-1);
    text-align: center;
    font-size: 1.1rem;
    &:hover {
      cursor: pointer;
      background-color: var(--background-1);
    }
  }
  #fonte1 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  #fonte2 {
    font-family: "ubuntu";
  }
  #fonte3 {
    font-family: "anonymous pro";
  }
  #fonte4 {
    font-family: "ceviche one";
  }
  #fonte5 {
    font-family: "dancing script";
  }
</style>

<!-- O Icon é quem lança os aplicativos e é quem fica na 
  área de trabalho e na de tarefas -->
<script>
  import { globalVariables } from "../../store";

  export let image = "../res/images/logo3.png";
  export let name = "Programa";

  // Pegamos o estilo
  let dark = document.body.className == "dark";
  // E nos inscrevemos ao valor do tema para atualizarmos
  // quando ele for
  globalVariables.subscribe((newVal) => {
    dark = newVal.theme === "dark";
  });

  export let desktop = false;
  export let taskbar = false;

  export let onClick = () => null;
  export let onDoubleClick = () => null;
</script>

<div
  class="icon"
  class:desktop
  class:taskbar
  on:click={onClick}
  on:dblclick={onDoubleClick}
>
  <span class="img-container">
    <img draggable="false" class:dark src={image} alt={name} />
  </span>
  {#if !taskbar}
    <p>{name}</p>
  {/if}
</div>

<style scoped lang="scss">
  .dark {
    // Se estamos no tema dark, invertemos as imagens 
    // para ficarem brancas
    filter: invert(1);
  }

  .icon.desktop {
    margin: 1rem;
    width: 7rem;
    height: 7rem;

    .img-container img {
      width: 3rem;
      height: 3rem;
    }
  }

  .icon.taskbar {
    width: 3rem;
    height: 3rem;
  }

  .icon {
    &,
    .img-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .img-container {
      background-color: var(--background-0);

      border-radius: 1.2rem;

      width: 4rem;
      height: 4rem;
    }

    .img-container img {
      width: 2rem;
      height: 2rem;
    }

    cursor: pointer;
    user-select: none;
    text-align: center;

    display: flex;
    flex-direction: column;

    p {
      margin: 0.2rem 0;
      word-wrap: break-word;
      // Nesse caso, usar as variáveis não fica bom
      color: #dadada;
      text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }

    &:hover {
      filter: brightness(1.2);
      font-weight: bold;
      transition: 0.1s;
    }
    transition: 0.1s;
  }
</style>

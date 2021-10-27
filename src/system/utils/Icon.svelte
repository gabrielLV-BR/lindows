<script>
  export let image = "../res/images/logo3.png";
  export let name = "Prograna";

  export let desktop = false;
  export let taskbar = false;

  export let onClick = () => null;
  export let onDoubleClick = () => null;
</script>

<div class="icon" class:desktop class:taskbar on:click={onClick} on:dblclick={onDoubleClick}>
  <img draggable="false" src={image} alt={name} />
  {#if !taskbar}
    <p>{name}</p>
  {/if}
</div>

<style scoped lang="scss">

  .icon.desktop {
    margin: 1rem;
    width:  7rem;
    height: 7rem;

    img {
      display: inline-block;
      margin: auto;
      width: 4rem;
      height: 4rem;
    }
  }

  .icon.taskbar {
    width : 3rem;
    height: 3rem;

    filter: saturate(0) invert(1);
  }

  .icon {
    img {
      background-color: var(--background-1);
      padding: 10px;
      border-radius: 20px;
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
      filter: brightness(1.1);
      font-weight: bold;
      transition: 0.1s;
    }
    transition: 0.1s;
  }
</style>

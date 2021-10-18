<script>
  export let image;
  export let name;

  export let desktop;
  export let taskbar;

  console.log(`desktop = ${desktop} \n taskbar = ${taskbar}`)

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
    width:  6rem;
    height: 6rem;

    img {
      display: inline-block;
      margin: auto;
      width: 4rem;
      height: 4rem;
    }
  }

  .icon.taskbar {
    width: 2rem;
    height: 2rem;

    filter: saturate(0) invert(1);
  }

  .icon {
    cursor: pointer;
    user-select: none;
    text-align: center;

    display: flex;
    flex-direction: column;

    p {
      margin: 0.2rem;
      word-wrap: break-word;
      text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }

    &:hover {
      filter: brightness(1.1);
    }
  }
</style>

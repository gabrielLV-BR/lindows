<script>
  export let image;
  export let name;
  export let taskbar = false;

  export let onClick = () => null;
  export let onDoubleClick = () => null;

</script>

<div class={`icon ${taskbar ? 'taskbar' : ''}`} on:click={onClick} on:dblclick={onDoubleClick}>
  <img draggable="false" src={image} alt={name} />
  {#if !taskbar}
    <p>{name}</p>
  {/if}
</div>

<style scoped lang="scss">
  .icon {
    cursor: pointer;
    user-select: none;
    text-align: center;

    display: flex;
    flex-direction: column;

    width: 4rem;
    height: 4rem;

    &.taskbar {
      margin: 0 5rem;
      width: 2rem;
      height: 2rem;

      img {
        filter: invert();
      }
    }

    p {
      margin: 0.2rem;
      word-wrap: break-word;
    }

    &:hover {
      filter: brightness(1.1);
    }
  }
</style>

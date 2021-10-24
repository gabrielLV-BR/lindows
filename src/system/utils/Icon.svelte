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
    width : 3rem;
    height: 3rem;

    filter: saturate(0) invert(1);
  }

  .icon {
    img {
      background-color: #d9d9d9;
      padding: 10px;
      border-radius: 20px;
    }
    
    cursor: pointer;
    user-select: none;
    text-align: center;

    display: flex;
    flex-direction: column;

    p {
      margin: 0.2rem;
      word-wrap: break-word;
      color: white;
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

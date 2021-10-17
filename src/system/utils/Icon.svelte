<script>
  export let image;
  export let name;

  export let onClick = () => null;
  export let onDoubleClick = () => null;

</script>

<div class="icon" on:click={onClick} on:dblclick={onDoubleClick}>
  <img draggable="false" src={image} alt={name} />
  <p>{name}</p>
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

    p {
      margin: 0.2rem;
      word-wrap: break-word;
    }

    &:hover {
      filter: brightness(1.1);
    }
  }
</style>

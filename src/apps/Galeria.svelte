<script>
  let imagesRoot = "../res/images/galery";
  let imageCount = 6;

  let curIndex = 1;

  const next = () => {
    if (curIndex < imageCount) curIndex++;
  };
  const previous = () => {
    if (curIndex > 1) curIndex--;
  };
</script>

<main class="galeria">
  <button class="before" on:click={previous}> &lt; </button>
  <img src={`${imagesRoot}/imagem${curIndex}.png`} alt="Imagem Atual" />
  <button class="after" on:click={next}> &gt; </button>
</main>

<style scoped lang="scss">
    .galeria {
        position: relative;

        &, img {
            width: 100%;
            height: 100%;
        }

        button {
            cursor: pointer;
            position: absolute;
            background: transparent;
            color: white;
            font-size: 4rem;
            top: 50%;
            transform: translateY(-50%);
        }

        .before {
            left: 0.5rem;
        }

        .after {
            right: 0.5rem;
        }
    }
</style>

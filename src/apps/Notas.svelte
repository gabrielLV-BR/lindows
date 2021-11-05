<script>
  let notasSalvas = [{ titulo: "Nova nota", texto: "" }];

  if (localStorage["notas-salvas"]) {
    notasSalvas = JSON.parse(localStorage["notas-salvas"]);
  }

  let selectedNotaIndex = 0;
  let nomeNota = notasSalvas[0].titulo;
  let textoNota = notasSalvas[0].texto;

  let invalido = false;

  function adicionarNota() {
    notasSalvas = [...notasSalvas, { titulo: "Nova Nota", texto: "" }];
    verNota(notasSalvas.length - 1);
  }

  function verNota(index) {
    // Salvamos a nota atual
    notasSalvas[selectedNotaIndex].titulo = nomeNota;
    notasSalvas[selectedNotaIndex].texto = textoNota;
    localStorage["notas-salvas"] = JSON.stringify(notasSalvas);

    // Agora sim, trocamos
    selectedNotaIndex = +index;
    nomeNota = notasSalvas[selectedNotaIndex].titulo;
    textoNota = notasSalvas[selectedNotaIndex].texto;
  }

  function remover(_nota) {
    notasSalvas = notasSalvas.filter(
      (nota) => nota.titulo != _nota.titulo && nota.texto != _nota.texto
    );
  }
</script>

<main class="all">
  <div class="salvos">
    <header class="adicionar" on:click={adicionarNota}>Criar nota</header>
    {#each notasSalvas as nota, i (nota)}
      <p class="listaTitulos" on:click={() => verNota(i)}>
        {nota.titulo}
        <button class="remover" on:click={() => remover(nota)}>X</button>
      </p>
    {/each}
  </div>
  <div class="anotacoes">
    <input
      class="tituloNota"
      placeholder="Título da nota"
      bind:value={nomeNota}
    />
    {#if invalido}
      <p class="erro">Insira algo válido!</p>
    {/if}
    <textarea class="nota" bind:value={textoNota} />
  </div>
</main>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  .all {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
  }
  .listaTitulos {
    background-color: var(--background-2);
    margin: 0.2rem 0;
    &:hover {
      cursor: pointer;
    }
  }
  .listaTitulos,
  .nota {
    padding: 0.6rem;
    overflow: hidden;
  }
  .adicionar {
    padding: 0.6rem;
    background-color: var(--background-1);
    text-align: center;
    &:hover {
      filter: brightness(1.1);
    }
  }
  .tituloNota {
    font-weight: bold;
    width: 100%;
    padding: 0.6rem;
    background-color: var(--background-1);
    text-align: center;
    outline: none;
    overflow: hidden;
    margin: 0;
    border: none;
    border-radius: 0;
    color: var(--font-color-2);
  }
  .tituloNota,
  .adicionar {
    border-top: 3px solid var(--font-color-3);
  }
  .salvos {
    width: 10rem;
    background-color: var(--background-1);
  }
  .anotacoes {
    width: calc(100% - 10rem);
    background-color: var(--background-0);
  }
  .nota {
    width: 100%;
    height: 90.5%;
    outline: none;
    text-align: justify;
    resize: none;
    border: none;
    overflow-y: auto;
    background-color: #fff;
    color: #000;
  }
  .remover {
    font-weight: bold;
    color: var(--error);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.4rem;
    float: right;
    &:hover {
      color: white;
      background-color: var(--error);
    }
  }
  .erro {
    color: var(--error);
    font-weight: bold;
    background: none;
    padding: 0.5rem;
    width: 10rem;
    margin: 1rem auto;
    font-weight: bold;
    text-decoration: underline;
  }
</style>

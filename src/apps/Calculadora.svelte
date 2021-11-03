<script>
  // Única variavel que é modificada
  let resultado = "";

  // Insere novos caracteres
  function insert(num) {
    resultado = `${resultado}${num}`;
  }
  // Limpa a variável "resultado"
  function clean() {
    resultado = "";
  }
  // Exclui o último caractere da variavel "resultado"
  function back() {
    resultado = resultado.slice(0, resultado.length - 1);
  }
  // Calcula todos os caracteres incluidos na variavel "resultado"
  function calcular() {
    if (resultado) {
      resultado = eval(resultado);
    } else {
      resultado = "Nada...";
    }
  }
</script>

<main class="calculadora">
  <p id="resultado">{resultado}</p>
  <div class="botoes">
    <button title="Limpar" on:click={clean}>C</button>
    <button title="Excluir" on:click={back}>⇦</button>
    <button title="Divisão" on:click={() => insert("/")}>/</button>
    <button title="Multiplicação" on:click={() => insert("*")}>*</button>
    <button title="Sete" on:click={() => insert("7")}>7</button>
    <button title="Oito" on:click={() => insert("8")}>8</button>
    <button title="Nove" on:click={() => insert("9")}>9</button>
    <button title="Subtração" on:click={() => insert("-")}>-</button>
    <button title="Quatro" on:click={() => insert("4")}>4</button>
    <button title="Cinco" on:click={() => insert("5")}>5</button>
    <button title="Seis" on:click={() => insert("6")}>6</button>
    <button title="Adição" on:click={() => insert("+")}>+</button>
    <button title="Um" on:click={() => insert("1")}>1</button>
    <button title="Dois" on:click={() => insert("2")}>2</button>
    <button title="Três" on:click={() => insert("3")}>3</button>
    <button title="Resultado" id="btnequal" on:click={calcular}>=</button>
    <button title="Zero" id="btnzero" on:click={() => insert("0")}>0</button>
    <button title="Ponto" on:click={() => insert(".")}>.</button>
  </div>
</main>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  .calculadora {
    min-width: 100%;
    height: max-content;
    margin: 0;
    flex: 1;
    padding: 20px;
    padding-bottom: 40px;
    background-color: var(--background-0);
    text-align: center;

    align-self: center;
    justify-self: center;

    border-radius: 5px;
  }
  #resultado {
    text-align: right;
    min-height: 3rem;
    color: var(--font-color-1);
    font-size: 30px;
    border-radius: 5px;
    padding: 4px;
    outline: hidden;
  }
  button {
    color: var(--font-color-1);
    background: none;
    padding: 1rem;
    margin: 0.1rem;
    font-size: 25px;
    border-radius: 3px;
  }
  #btnzero {
    grid-column: 1 / 3;
  }

  #btnequal {
    grid-column: 4 / 4;
    grid-row: 4 / 6;
  }

  .botoes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-top: 4px;
    height: 80%;
  }

  button:hover {
    background-color: var(--background-2);
    cursor: pointer;
  }
</style>

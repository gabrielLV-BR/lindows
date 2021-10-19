<script>
  function insert(num) {
    var numero = document.getElementById("resultado").innerHTML;
    document.getElementById("resultado").innerHTML = numero + num;
  }

  function clean() {
    document.getElementById("resultado").innerHTML = "";
  }

  function back() {
    var resultado = document.getElementById("resultado").innerHTML;
    document.getElementById("resultado").innerHTML = resultado.substring(
      0,
      resultado.length - 1
    );
  }

  function calcular() {
    var resultado = document.getElementById("resultado").innerHTML;
    if (resultado) {
      document.getElementById("resultado").innerHTML = eval(resultado);
    } else {
      document.getElementById("resultado").innerHTML = "Nada...";
    }
  }
</script>

<main class="calculadora">
  <p id="resultado" />
  <div class="botoes">
    <button on:click={clean}>C</button>
    <button on:click={back}>⬅</button>
    <button on:click={() => insert("/")}>/</button>
    <button on:click={() => insert("*")}>*</button>
    <button on:click={() => insert("7")}>7</button>
    <button on:click={() => insert("8")}>8</button>
    <button on:click={() => insert("9")}>9</button>
    <button on:click={() => insert("-")}>-</button>
    <button on:click={() => insert("4")}>4</button>
    <button on:click={() => insert("5")}>5</button>
    <button on:click={() => insert("6")}>6</button>
    <button on:click={() => insert("+")}>+</button>
    <button on:click={() => insert("1")}>1</button>
    <button on:click={() => insert("2")}>2</button>
    <button on:click={() => insert("3")}>3</button>
    <button id="btnequal" on:click={calcular}>=</button>
    <button id="btnzero" on:click={() => insert("0")}>0</button>
    <button on:click={() => insert(".")}>.</button>
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
    width: 65%;
    height: 80%;
    padding: 20px;
    padding-bottom: 40px;
    background-color: #292929;
    text-align: center;
    margin: 3% auto;
    border-radius: 5px;
  }
  #resultado {
    text-align: right;
    height: 12%;
    background-color: #fff;
    font-size: 30px;
    border-radius: 5px;
    padding: 4px;
    outline: hidden;
  }
  button {
    color: #191919;
    background-color: #898989;
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
    color: #fff;
    background-color: #191919;
    cursor: pointer;
  }
</style>

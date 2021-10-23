<script>

  let milisegundos = 0;
  let segundos = 0;
  let intervalo;

  function iniciar() {
    intervalo = setInterval(() => {
      milisegundos++;

      if (milisegundos >= 100) {
        milisegundos = 0;
        segundos++;
      }
    }, 10);
  }

  function parar() {
    clearInterval(intervalo);
  }

  function reiniciar() {
    segundos = 0;
    milisegundos = 0;
  }
</script>

<main class="cronometro">
  <p id="timer">
    <span>{String(segundos).padStart(2, "0")}</span>:<span>{String(milisegundos).padStart(2, "0")}</span>
  </p>
  <button on:click={iniciar}>Iniciar</button>
  <button on:click={parar}>Parar</button>
  <button on:click={reiniciar}>Reiniciar</button>
</main>

<style>
  .cronometro {
    flex: 1;
    text-align: center;
  }
  button {
    background-color: lightgrey;
    width: 20%;
    font-size: 20px;
  }
  button:hover {
    color: white;
    background-color: #292929;
    cursor: pointer;
  }
  #timer {
    width: 50%;
    font-size: 30px;
    padding: 2%;
    background-color: lightgray;
    margin: 5% auto;
  }
  button,
  #timer {
    border-radius: 3px;
  }
</style>

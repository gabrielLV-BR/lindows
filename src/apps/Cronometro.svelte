<script>
  // Define variáveis
  let milisegundos = 0;
  let segundos = 0;
  let intervalo = -1;
  // Inicia e 'despausa' o tempo
  function iniciar() {
    intervalo = setInterval(() => {
      milisegundos++;

      if (milisegundos >= 100) {
        milisegundos = 0;
        segundos++;
      }
    }, 10);
  }
  // Para o tempo
  function parar() {
    clearInterval(intervalo);
    intervalo = -1;
  }
  // Reinicia o tempo
  function reiniciar() {
    segundos = 0;
    milisegundos = 0;
  }
</script>

<main class="cronometro">
  <p id="timer">
    <span>{String(segundos).padStart(2, "0")}</span>:<span>{String(milisegundos).padStart(2, "0")}</span>
  </p>
  <button on:click={() => {if(intervalo === -1) iniciar() }}>Iniciar</button>
  <button on:click={parar}>Parar</button>
  <button on:click={reiniciar}>Reiniciar</button>
</main>

<style>
  .cronometro {
    flex: 1;
    text-align: center;
  }
  button {
    color: var(--font-color-1);
    background-color: var(--background-2);
    width: 20%;
    font-size: 20px;
  }
  button:hover {
    color: var(--font-color-1);
    background-color: var(--background-1);
    cursor: pointer;
  }
  #timer {
    width: 50%;
    font-size: 30px;
    padding: 2%;
    background-color: var(--background-2);
    margin: 5% auto;
  }
  button,
  #timer {
    border-radius: 3px;
  }
</style>

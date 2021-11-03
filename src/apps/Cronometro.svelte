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
  // Reinicia e para o tempo
  function reiniciar() {
    clearInterval(intervalo);
    intervalo = -1;
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
  * {
    margin: 0;
    padding: 0;
  }
  .cronometro {
    flex: 1;
    text-align: center;
  }
  button {
    color: var(--font-color-1);
    background-color: var(--background-1);
    width: 7rem;
    font-size: 1.3rem;
    padding: 1rem;
  }
  button:hover {
    color: var(--font-color-1);
    background-color: var(--background-2);
    cursor: pointer;
  }
  #timer {
    width: 14rem;
    font-size: 2rem;
    padding: 1rem;
    background-color: var(--background-1);
    margin: 5% auto;
  }
  button,
  #timer {
    border-radius: .5rem;
  }
</style>

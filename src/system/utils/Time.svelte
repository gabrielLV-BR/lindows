<script>
  // Horario e dia da semana, adquiridos pela função 'Date()'
  let hoje = new Date();
  let hora = hoje.getHours();
  let minuto = hoje.getMinutes();

  export let onClick = () => null;

  // se o minuto for >10, adiciona um '0' na frente (estética)
  let minutoTexto = `${minuto}`;
  if (minuto < 10) {
    minutoTexto = "0" + minutoTexto;
  }

  // Array de dias da semana
  let dias = new Array(
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado"
  );

  // definindo texto com as variáveis que serão mostadas ao usuário
  $: dateText = `${dias[hoje.getDay()]}  |  ${hora}:${minutoTexto}`;
</script>

<!-- A variavel em sí, a que vai aparecer na tela -->
<p on:click={onClick} class="hora" id="hora">{dateText}</p>

<style lang="scss">
  #hora {
    font-size: 1.2rem;
    &:hover {
      cursor: pointer;
    }
  }
</style>


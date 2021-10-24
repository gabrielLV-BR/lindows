<script>
  // Horario e dia da semana
  let hoje = new Date();
  let hora = hoje.getHours();
  let minuto = hoje.getMinutes();

  let minutoTexto = `${minuto}`;
  if (minuto < 10) {
    minutoTexto = "0" + minutoTexto;
  }
  let dias = new Array(
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado"
  );

  $: dateText = `${dias[hoje.getDay()]} | ${hora}:${minutoTexto}`;
</script>

<p class="hora" id="hora">{dateText}</p>

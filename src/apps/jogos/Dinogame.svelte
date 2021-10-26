<script>
  // Importação de funções do svelte
  import { onMount, onDestroy } from "svelte";

  export let maximized;

  // Referências ao canvas e ao contexto dele (estão sendo atribuídas para ter auto complete kkkk)
  let canvas = document.createElement("canvas");
  let cc = canvas.getContext("2d");

  let spritesheet;

  let isActive = false;
  let isDead = false;
  let isNotRunning = true;

  let highscore;
  let instructionsHidden;

  // Dados do jogo
  let player = {
    x: 10,
    y: 400,
    w: 22,
    h: 21,
  };

  let velY = 0;
  const maxVelY = 5;
  const gravity = 6;
  const jumpHeight = -35;

  let spriteIndex = 0;
  let timer = 0;
  let obstacles = [];
  let resetButton = document.createElement("img");

  let score = 0;
  let remainingJumps = 1;

  let createObstacleTimeoutHandle;
  let scoreTimeoutHandle;

  const reset = () => {
    // Limpa obstáculos
    obstacles = [];
    // Reseta valores
    spriteIndex = 0;
    timer = 0;
    velY = 0;
    isDead = false;
    isNotRunning = false;
    score = 0;
    // Recomça a spawnar inimigos e contar os pontos
    createObstacleTimeoutHandle = setTimeout(
      createObstacle,1000
    );
    scoreTimeoutHandle = setTimeout(startScore, 0);
  };

  const die = () => {
    // Morre
    isDead = true;
    // Para de correr
    isNotRunning = true;
    // Remove os obstáculos que não estão na tela
    obstacles = obstacles.filter((obs) => 0 < obs.x < canvas.width);

    clearTimeout(createObstacleTimeoutHandle);
    clearTimeout(scoreTimeoutHandle);
  };

  const createObstacle = () => {
    // Adicione à lista de obstáculos um novo obstáculo
    obstacles = [
      ...obstacles,
      {
        w: 25,
        h: 24,
        x: canvas.width,
        y: canvas.height - 24,
      },
    ];

    // Se o jogo estiver ativo, rodando, e o jogador não estiver morto,
    // Continue a spawnar inimigos
    if (isActive && !isDead && !isNotRunning) {
      createObstacleTimeoutHandle = setTimeout(
        createObstacle,
        Math.random() * 2000 + 500
      );
    }
  };

  const isColliding = (obs) => {
    /// Retorna se o jogador está colidindo com 'obs' usando um método simples de detecção de colisão entre retângulos alinhados
    return (
      player.x + player.w >= obs.x &&
      player.x <= obs.x + obs.w &&
      player.y + player.h >= obs.y &&
      player.y <= obs.y + obs.h
    );
  };

  const startScore = () => {
    score++;
    if (!isNotRunning) {
      scoreTimeoutHandle = setTimeout(startScore, 500);
    }
  };

  const start = async () => {
    // Carrega opções do localStorage
    if (!localStorage["dinogame-highscore"]) {
      localStorage["dinogame-highscore"] = 0;
    }

    if (!localStorage["dinogame-hide-instructions"]) {
      localStorage["dinogame-hide-instructions"] = false;
    }

    highscore = localStorage["dinogame-highscore"];
    instructionsHidden = localStorage["dinogame-hide-instructions"] === "true";
    // Marca a sessão como ativa
    isActive = true;
    // Adiciona um eventListener
    window.addEventListener("keydown", handleInput);

    // Calcula posição y do jogador com base no height do canvas, pro dinossauro ficar com os pés no chão
    player.y = canvas.height - player.h;

    // Adquire o contexto de desenho do canvas e desativa filtro de imagem
    cc = canvas.getContext("2d");
    cc.imageSmoothingEnabled = false;

    // Começa a contagem de pontos
    startScore();
    // Começa loop do jogo
    loop();
  };

  const cleanup = () => {
    // Marca a sessão como desativa
    isActive = false;
    // Remove eventListener do teclado
    window.removeEventListener("keydown", handleInput);
    localStorage["dinogame-highscore"] = highscore;
  };

  const loop = () => {
    // Atualiza
    update();
    // Desenha
    render();
    // Loopa
    requestAnimationFrame(() => {
      if (isActive) loop();
    });
  };

  const update = () => {
    // Se o player estiver perto do chão, resete os pulos dele
    if (player.y + player.h > canvas.height - 5 && !isNotRunning) {
      remainingJumps = 1;
    }

    // Adicione gravidade à velocidade no eixo Y
    velY += gravity;

    // Limite a velocidade para baixo da velocidade no eixo Y
    if (velY > maxVelY) velY = maxVelY;

    // Adicione a velocidade do eixo Y à posição do jogados
    player.y += velY;

    // Corrige a posição Y do jogador pra ele ficar com os pés no chão
    if (player.y + player.h > canvas.height) {
      player.y = canvas.height - player.h;
    }

    // Verifica o highscore
    if (score > highscore) {
      highscore = score;
    }

    // Cactus
    // Filtra os inimigos, deixando somente aqueles que ainda não passaram pro lado esquerdo da tela
    obstacles = obstacles.filter((obs) => obs.x + obs.w > 0);

    // Para cada inimigo...
    obstacles.forEach((obstacle) => {
      // ...Adicione -5 ao seu X (movendo ele pra esquerda)
      obstacle.x -= 5 *Number(!isNotRunning);
      // ...Verifique se o mesmo está colidindo e, se sim, mate o jogador
      if (isColliding(obstacle)) die();
    });

    if (!isDead) {
      // Timer para animações
      timer++;
      if (timer > 15) {
        timer = 0;
        spriteIndex = (spriteIndex + 1) % 2;
      }
    }
  };

  const drawScore = () => {
    let x = 20;
    const spacing = 10;
    for (let digito of `${score}`) {
      let dx = 175 + 3 * (digito % 8);
      let dy = 5 * Math.floor(digito / 8);

      cc.drawImage(spritesheet, dx, dy, 3, 5, x, 10, 9, 10);

      x += spacing;
    }
  };

  const render = () => {
    // Limpe a tela
    cc.fillStyle = "rgb(140, 140, 250)";
    cc.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a pontuação do jogador
    drawScore();

    // Se o jogador estiver morto...
    if (isDead) {
      // ...desenhe o sprite dele morto
      cc.drawImage(spritesheet, 50, 0, 25, 24, player.x, player.y - 3, 25, 24);
    } else {
      // ... se não, desenhe ele normalmente
      // Esse drawImage() com 9 argumentos nos permite incluir que parte da imagem o canvas vai renderizar, o que nos permite colocar
      // todos os sprites (imagens do jogador, do cactus, dos números, etc) em uma imagem só.
      cc.drawImage(
        spritesheet, // Imagem a ser desenhada
        3 + 25 * spriteIndex, // Porção da imagem a ser desenhada: início do eixo X
        5, // Porção da imagem a ser desenhada: início do eixo Y
        19, // Porção da imagem a ser desenhada: largura
        19, // Porção da imagem a ser desenhada: altura
        player.x, // Onde a imagem será desenhada no eixo X
        player.y, // Onde a imagem será desenahda no eixo Y
        player.w, // Largura da imagem a ser desenhada
        player.h // Altura da imagem a ser desenhada
      );
    }

    // Desenha todos os obstáculos do mesmo jeito que o jogador
    obstacles.forEach((obs) => {
      cc.drawImage(
        spritesheet,
        25 * 3,
        0,
        25,
        24,
        obs.x,
        canvas.height - obs.h,
        obs.w,
        obs.h
      );
    });
  };

  const jump = () => {
    // Se o jogador ainda tiver pulos e estiver correndo...
    if (remainingJumps > 0 && !isNotRunning) {
      // Sette a velocidade do jogador no eixo Y (com um valor negativo)
      velY = jumpHeight;
      // Subtraia a quatidade de pulos restantes
      remainingJumps--;
    }
  };

  function handleInput(event) {
    // Se for espaço, pule
    if (event.key === " ") jump();
    // Se for R, resete
    else if (event.key === "r") reset();
  }

  function hideInstructions(neverShow = false) {
    instructionsHidden = true;
    localStorage["dinogame-hide-instructions"] = neverShow;
  }

  function clearHighScore() {
    highscore = 0;
    localStorage["dinogame-highscore"] = 0;
  }

  // onMount vai executar a função quando o elemento carregar
  onMount(start);
  // onDestroy vai executar a função quando o elemento for destruído
  onDestroy(cleanup);
</script>

<!--  -->
<div id="game" class:maximized>
  <canvas
    width="200px"
    height="150px"
    on:keydown={handleInput}
    bind:this={canvas}
  />

  <!-- Instruções -->
  <div class="instructions" class:instructionsHidden>
    <h1>Instruções</h1>
    <div>
      <p>[ESPAÇO] Pular (o Dinossauro tem double-jump)</p>
      <p>[R] Resetar</p>
      <p>Evite os cactos</p>
      <p>(Clique na pontuação máxima pra resetá-la)</p>
      <br />
      <button on:click={hideInstructions}>Fechar</button>
      <button on:click={() => hideInstructions(true)}>
        Nunca mais mostrar</button
      >
    </div>
  </div>

  <!-- High Scores -->
  <p on:click={clearHighScore} class="highscore">
    {highscore}
  </p>

  <!-- Botão de resetar -->
  <img
    class:isNotRunning
    bind:this={resetButton}
    on:click={reset}
    src="../res/images/play.svg"
    alt="Jogar"
  />

  <!-- Spritesheet -->
  <img
    src="../res/images/games/dinogame_spritesheet.png"
    bind:this={spritesheet}
    alt=""
  />
</div>

<style scoped lang="scss">
  @font-face {
    font-family: ArcadeClassic;
    src: url(../res/fonts/arcadeclassic.ttf);
  }

  #game {
    position: relative;

    display: block;
    margin: auto;

    width: 499px;
    height: 465px;
  }

  .instructions {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 80%;

    li {
      list-style: none;
    }
    font-size: 1rem;
    padding: 0.3rem;

    border-radius: 0.4rem;

    text-align: center;
    background: var(--background-1);
    color: var(--font-color-1);
  }

  .instructionsHidden {
    display: none;
  }

  .highscore {
    cursor: pointer;

    position: absolute;
    bottom: 0;
    right: 1rem;
    color: white;

    text-align: right;
    margin: 0;
    font-size: 2rem;
    font-family: ArcadeClassic;
  }

  .isNotRunning {
    position: absolute;

    cursor: pointer;
    display: block;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 1;
    width: 10rem;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
</style>

<script>
  import { onMount, onDestroy } from "svelte";

  let canvas = document.createElement("canvas");
  let cc = canvas.getContext("2d");

  let rodando = false;

  // Dados do jogo
  let dinossauro = {
    x: 10,
    y: 400,
    w: 18,
    h: 18,
  };

  let velY = 0;
  const maxVelY = 3;
  const gravity = 2;
  const jumpHeight = -20;

  let cactusSprite;

  let dinossaurSprites = new Array(2);
  let spriteIndex = 0;
  let timer = 0;
  let obstacles = [];

  const createObstacle = () => {
    console.log(obstacles);
    obstacles = [
      ...obstacles,
      {
        x: canvas.width,
        w: 25,
        h: 24,
      },
    ];
  };

  const start = () => {
    rodando = true;
    window.addEventListener("keydown", handleInput);

    dinossauro.y = canvas.height - dinossauro.h;

    cc = canvas.getContext("2d");
    loop();
  };

  const cleanup = () => {
    rodando = false;
    window.removeEventListener("keydown", handleInput);
  };

  const loop = () => {
    update();
    render();
    requestAnimationFrame(() => {
      if (rodando) loop();
    });
  };

  const update = () => {
    velY += gravity;

    if (velY > maxVelY) velY = maxVelY;

    dinossauro.y += velY;

    if (dinossauro.y + dinossauro.h > canvas.height) {
      dinossauro.y = canvas.height - dinossauro.h;
    }

    // Cactus
    obstacles = obstacles.filter((obs) => obs.x + obs.w > 0);

    obstacles.forEach((obstacle) => {
      obstacle.x -= 5;
    });

    if (obstacles.length == 0) {
      createObstacle();
    }

    // Timer
    timer++;
    if (timer > 15) {
        timer = 0;
        spriteIndex = (spriteIndex + 1) % 2;
    }
  };

  const render = () => {
    cc.fillStyle = "rgb(140, 140, 250)";
    cc.fillRect(0, 0, canvas.width, canvas.height);

    cc.fillStyle = "rgb(255, 0, 0)";
    // cc.fillRect(dinossauro.x, dinossauro.y, dinossauro.w, dinossauro.h);
    cc.drawImage(
      dinossaurSprites[spriteIndex],
      dinossauro.x,
      dinossauro.y,
      dinossauro.w,
      dinossauro.h
    );

    cc.fillStyle = "rgb(30, 200, 20)";
    obstacles.forEach((obs) => {
      cc.drawImage(cactusSprite, obs.x, canvas.height - obs.h, obs.w, obs.h)
    });
  };

  const jump = () => {
    if (dinossauro.y + dinossauro.h > canvas.height - 4) {
      velY = jumpHeight;
    }
  };

  function handleInput(event) {
    console.log(event);
    if (event.key == " ") jump();
  }

  // onMount vai executar a função o elemento carregar
  onMount(start);
  onDestroy(cleanup);
</script>

<!--  -->
<canvas
  width="200px"
  height="150px"
  on:keydown={handleInput}
  bind:this={canvas}
/>
<div style="display: none;">
  <img src="../res/images/games/dino1.png"  bind:this={dinossaurSprites[0]} alt=""/>
  <img src="../res/images/games/dino2.png"  bind:this={dinossaurSprites[1]} alt=""/>
  <img src="../res/images/games/cactus.png" bind:this={cactusSprite}        alt="">
</div>

<style scoped>
  canvas {
    width: 499px;
    height: 465px;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
</style>

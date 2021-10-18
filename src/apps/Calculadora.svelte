<main class="calculadora">

    <p id="resultado"></p>
    
    <button class="botao" on:click={clean}>C</button>
    <button class="botao" on:click={back}>⬅</button>
    <button class="botao" on:click={insert('/')}>/</button>
    <button class="botao" on:click={insert('*')}>*</button>
    <button class="botao" on:click={insert('7')}>7</button>
    <button class="botao" on:click={insert('8')}>8</button>
    <button class="botao" on:click={insert('9')}>9</button>
    <button class="botao" on:click={insert('-')}>-</button>
    <button class="botao" on:click={insert('4')}>4</button>
    <button class="botao" on:click={insert('5')}>5</button>
    <button class="botao" on:click={insert('6')}>6</button>
    <button class="botao" on:click={insert('+')}>+</button>
    <button class="botao" on:click={insert('1')}>1</button>
    <button class="botao" on:click={insert('2')}>2</button>
    <button class="botao" on:click={insert('3')}>3</button>
    <button class="botao" on:click={calcular}>=</button>
    <button class="botao" on:click={() => insert('0')}>0</button>
</main>

<script>
    function insert(num) {
        var numero = document.getElementById('resultado').innerHTML;
        document.getElementById('resultado').innerHTML = numero + num;
    }

    function clean() {
        document.getElementById('resultado').innerHTML = "";
    }

    function back() {
        var resultado = document.getElementById('resultado').innerHTML;
        document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length -1);
    }

    function calcular() {
        var resultado = document.getElementById('resultado').innerHTML;
        if(resultado) {
            document.getElementById('resultado').innerHTML = eval(resultado);
        }
        else {
            document.getElementById('resultado').innerHTML = "Nada..."
        }
    }
</script>

<style>
    *{
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
       
    .calculadora{
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 3px;
        padding: 15px;
    }
    .botao{
        width: 50px;
        height: 50px;
        font-size: 25px;
        cursor: pointer;
        margin: 3px;
        background-color: #292929;
        border: none;
        color: #fff;
    }
    .botao:hover{
        background-color: #191919;
    }
    #resultado{
        background-color: white;
        width: 207px;
        height: 30px;
        margin: 5px;
        font-size: 25px;
        color: #191919;
        text-align: right;
        overflow: hidden;
        padding: 5px;
    }
</style>
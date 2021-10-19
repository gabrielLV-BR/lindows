<main class="lista">
    <div class="menu">
        {#if invalido}
            <p class="erro" style="font-weight: bold;">Insira algo válido!</p>
        {/if}
        <input type="text" placeholder="Digite sua tarefa" bind:value={texto} on:keydown={evento => {if(evento.key == "Enter") adicionar()}}> <button class="adicionar" on:click={adicionar}>Add</button>
    </div>
    <ul>
        {#each tarefas as tarefa}
            <li>
                <input type="checkbox">
                <span>{tarefa}</span>
                <button class="remover" on:click={() => remover(tarefa) }>X</button>
            </li>
        {/each}
    </ul>
</main>

<script>
    let tarefas = []
    let texto = ""
    let invalido = false

    function adicionar(){
        if(texto != "" && !tarefas.includes(texto)){
            tarefas = [...tarefas,texto]
            texto = ""
            invalido = false
        }
        else{
            invalido = true
        }
    }

    function remover(_texto1){
        tarefas = tarefas.filter((_texto2) => _texto2 != _texto1)
    }
</script>

<style lang="scss">
    .lista{
        width: 80%;
        margin: 1% auto;
        padding: 2%;
        background-color: #898989;
        border-radius: 5px;
    }
    input:checked + span{
        text-decoration: line-through;
    }
    li{
        list-style: none;
        overflow: hidden;
        span{
            font-size: 30px;
        }
    } 
    input[type="text"]{
        width: 70%;
        background-color: #d9d9d9;
        border-radius: 8px;
        outline: none;
    }
    .adicionar{
        width: 20%;
        cursor: pointer;
        overflow: hidden;
        background-color: #393939;
        color: white;
        border-radius: 8px;
    }
    .adicionar:hover {
        background-color: #191919;
    }
    .menu{
        text-align: center;
    }
    input[type="text"], 
    .adicionar, 
    .erro{
        font-size: 26px;
    }
    input[type="checkbox"]{
        width: 23px;
        height: 23px;   
    }
    .remover {
        font-weight: bold;
        color: red;
        width: 35px;
        height: 35px;
        border-radius: 8px;
    }
    .remover:hover {
        color: white;
        background-color: red;
    }
    .erro{
        color: red;
        font-weight: bold;
        background-color: white;
        padding: 5px;
        width: 80%;
        border-radius: 5px;
        margin: 1% auto;
    }
</style>
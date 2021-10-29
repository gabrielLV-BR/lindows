<main class="lista">
    <div class="menu">
        {#if invalido}
            <p class="erro" style="font-weight: bold;">Insira algo válido!</p>
        {/if}
        <input type="text" placeholder="Digite sua tarefa" bind:value={texto} on:keydown={evento => {if(evento.key == "Enter") adicionar()}}> <button class="adicionar" on:click={adicionar}>Add</button>
    </div>
    <ul>
        {#each tarefas as tarefa (tarefa)}
            <li>
                <input id="{tarefa}" type="checkbox">
                <label for="{tarefa}">{tarefa}</label>
                <button class="remover" on:click={() => remover(tarefa) }>X</button>
            </li>
        {/each}
    </ul>
</main>

<script>
    // Define as variaveis
    let tarefas = []
    let texto = ""
    let invalido = false

    // Adiociona itens 
    function adicionar(){
        // Testa o input para não adicionar itens inválidos
        if(texto != "" && !tarefas.includes(texto)){
            tarefas = [...tarefas,texto]
            texto = ""
            invalido = false
        }
        else{
            invalido = true
        }
    }

    // Remove itens da lista
    function remover(_texto1){
        tarefas = tarefas.filter((_texto2) => _texto2 != _texto1)
    }
</script>

<style lang="scss">
    .lista{
        width: 80%;
        height: fit-content;
        margin: 1% auto;

        padding: 2%;
        background-color: var(--background-2);
        border-radius: 5px;
    }
    input:checked + label{
        padding-left: 0.5rem;
        text-decoration: line-through;
    }
    li{
        list-style: none;
        overflow: hidden;
        width: 100%;

        margin-top: 0.1rem;

        display: flex;
        flex-direction: row;
        align-items: center;
        
        input, button.remover {
            margin: 0;
        }

        label{
            display: inline-block;
            margin-left: 1rem;
            width: 100%;
            font-size: 30px;
        }
    } 
    input[type="text"]{
        width: 70%;
        border-color: var(--background-2);
        background-color: var(--background-1);
        border-radius: 8px;
        outline: none;
    }
    .adicionar{
        width: 20%;
        cursor: pointer;
        overflow: hidden;
        background-color: var(--background-2);
        color: var(--font-color-1);
        border-radius: 8px;
    }
    .adicionar:hover {
        background-color: var(--background-1);
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
        color: var(--error);
        width: 35px;
        height: 35px;
        border-radius: 8px;
    }
    .remover:hover {
        color: white;
        background-color: var(--error);
    }
    .erro{
        color: var(--error);
        font-weight: bold;
        background-color: white;
        padding: 5px;
        width: 80%;
        border-radius: 5px;
        margin: 1% auto;
    }
</style>
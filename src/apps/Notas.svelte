<script>
    let notasSalvas = [];

    let nomeNota = "";
    let textoNota = "";
    let invalido = false;

    function adicionarNota() {
        if(nomeNota != "" && !notasSalvas.find(nota => nota.titulo == nomeNota)){
            notasSalvas = [...notasSalvas,{titulo: nomeNota, texto: textoNota,}]
            nomeNota = "";
            textoNota = "";
            invalido = false;
        } 
        else {
            invalido = true;
        }
    }
    function verNota() {
        
    }
    function remover(_nota){
        notasSalvas = notasSalvas.filter((nota) => nota.titulo != _nota.titulo)
    }
</script>

<main class="all">
    <div class="salvos">
        <header class="adicionar" on:click={adicionarNota}>Add Note</header>
        {#each notasSalvas as nota (nota)}
            <p class="listaTitulos" on:click={verNota}>{nota.titulo} <button class="remover" on:click={() => remover(nota)}>X</button> </p>
        {/each}
    </div>
    <div class="anotacoes">
        <input class="tituloNota" placeholder="Título da nota" bind:value={nomeNota}>
        {#if invalido}
            <p class="erro">Insira algo válido!</p>
        {/if}
        <textarea class="nota" bind:value={textoNota}></textarea>
    </div>
</main>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
.all {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
}
.listaTitulos {
    background-color: var(--background-2);
    margin: .2rem 0;
    &:hover {
        cursor: pointer;
    }
}
.listaTitulos, .nota {
    padding: .6rem;
    overflow: hidden;
}
.adicionar {
    padding: .6rem;
    background-color: var(--background-1);
    text-align: center;
    &:hover {
        filter: brightness(1.1);
    }
}
.tituloNota {
    width: 100%;
    padding: .6rem;
    background-color: var(--background-1);
    text-align: center;
    outline: none;
    overflow: hidden;
    margin: 0;
    border: none;
    border-radius: 0;
    color: var(--font-color-2);
}
.tituloNota, .adicionar {
    border-top: 3px solid var(--font-color-3);
}
.salvos {
    width: 10rem;
    background-color: var(--background-1);
}
.anotacoes {
    width: calc(100% - 10rem);
    background-color: var(--background-0);
}
.nota {
    width: 100%;
    height: 90.5%;
    outline: none;
    text-align: justify;
    resize: none;
    border: none;
    overflow-y: auto;
    background-color: #FFF;
    color: #000;
}
.remover {
    font-weight: bold;
    color: var(--error);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: .4rem;
    float: right;
    &:hover {
        color: white;
        background-color: var(--error);
    }
}
.erro{
    color: var(--error);
    font-weight: bold;
    background: none;
    padding: .5rem;
    width: 10rem;
    margin: 1rem auto;
    font-weight: bold;
    text-decoration: underline;
}
</style>
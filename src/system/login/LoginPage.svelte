<script>
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";

    import ImageSelector from "./ImageSelector.svelte";
    import { hash } from "../utils/hash";

    export let enter = () => null;

    let timer = 0;
    let nome = "";
    let senha = "";
    let imageURL = "";
    let captcha = "";

    let warningText = "";
    let hasAccount = false;

    const interval = setInterval(() => {
        timer++;
        if (timer > 6) {
            clearInterval(interval);
        }
    }, 1000);

    function setImage(img) {
        imageURL = img;
    }

    function forgotPass() {
        warningText = "Anote da próxima vez."
        localStorage.setItem("user-password", hash(prompt("Insira sua nova senha")));
        setTimeout(enter, 1500);
    }

    function handleLogin(event) {
        if (hasAccount) {
            console.log(localStorage.getItem("user-name"))

            console.log(`${hash(senha)} == ${localStorage.getItem("user-password")}?`)
            if (
                nome == localStorage.getItem("user-name") &&
                hash(senha) == localStorage.getItem("user-password")
            ) {
                enter();
            } else {
                warningText = "Usuário ou senha inválidos.";
            }
        } else {
            if (`${nome}`.trim().length <= 1 || `${senha}`.trim().length <= 1) {
                warningText = "Nome e senha não podem ser nulos!";
                return;
            }

            // É hard-coded mas é mais uma piada do que algo sério
            console.log(captcha.replaceAll(" ", "").toLowerCase())
            
            if (
                captcha.replaceAll(" ", "").toLowerCase() !== "onepieceehruim"
            ) {

                warningText = "Desculpe, somos robofóbicos.";
                return;
            }

            // Por mais que seja piada, é bom salver hasheado
            localStorage.setItem("user-password", hash(senha));
            localStorage.setItem("user-name", nome);
            localStorage.setItem("user-image", imageURL);

            enter();
        }
    }

    onMount(() => {
        if ((nome = localStorage.getItem("user-name"))) {
            hasAccount = true;
            imageURL = localStorage.getItem("user-image") ?? "";
        } else {
            nome = "";
        }
    });
</script>

<main>
    {#if 1 < timer && timer < 4}
        <p transition:fly id="intro">Olá!</p>
    {/if}
    {#if timer > 4}
        {#if hasAccount}
            <p transition:fly id="question">Bem vindo, {nome}</p>
        {:else}
            <p transition:fly id="question">Quem é você?</p>
        {/if}
    {/if}
    <form
        on:submit|preventDefault={handleLogin}
        transition:fly
        id="form"
        action=""
    >
        {#if warningText !== ""}
            <div class="warningText">
                <img
                    src="../res/images/close.svg"
                    on:click={() => {
                        warningText = "";
                    }}
                    alt="Fechar"
                />
                {warningText}
            </div>
        {/if}
        <div class="image-selector">
            <ImageSelector {imageURL} {setImage} />
        </div>
        <label for="name">Nome:</label>
        <input bind:value={nome} type="text" name="name" id="name" />
        <label for="password">Senha:</label>
        <input
            bind:value={senha}
            type="password"
            name="password"
            id="password"
        />
        {#if !hasAccount}
            <div class="captcha">
                <label for="">Resolva o seguinte Captcha</label>
                <img
                    draggable="false"
                    src="../res/images/captcha/captcha1.png"
                    alt=""
                />
                <span>
                    <input bind:value={captcha} type="text" name="captcha" />
                    <input type="submit" value="Registrar" />
                </span>
            </div>
        {:else}
            <span>
                <input type="submit" value="Entrar" />
                <button on:click|preventDefault={forgotPass}>Esqueceu a senha?</button>
            </span>
        {/if}
    </form>
</main>

<style scoped lang="scss">
    @keyframes fly-upwards {
        60% {
            top: 20%;
        }
        100% {
            top: 0%;
        }
    }

    @keyframes fade-in {
        90% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .warningText {
        display: block;
        background: var(--error);
        padding: 1rem;
        border-radius: 1rem;
        position: relative;

        width: 100%;

        img {
            cursor: pointer;
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translate3d(0, -50%, 0);

            width: 20px;
            height: 20px;

            filter: invert(1);
        }

        color: white;
        font-size: 1.4rem;

        margin-bottom: 1rem;
    }

    .linklike {
        font-size: 0.8rem;
        margin: 0;
        cursor: pointer;
        opacity: 0.8;

        &:hover {
            opacity: 1;
        }
    }

    p {
        position: relative;
        top: 20%;
        color: var(--font-color-1);
        font-size: 2rem;
    }

    #question {
        margin: 1rem auto;
        animation: fly-upwards 2s forwards;
    }

    .image-selector {
        width: 10rem;
        height: 10rem;
    }

    form {
        opacity: 0;
        user-select: none;
        animation: fade-in 7.5s forwards;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        margin-bottom: 4rem;

        overflow: hidden auto;

        background: var(--background-2);

        border-radius: 1rem;
        padding: 2rem 3rem;

        z-index: 2;

        label {
            margin-top: 0.4rem;
            color: var(--font-color-1);
            font-size: 1.4rem;
        }

        input,
        button {
            font-size: 1.5rem;
            outline-width: 0;
            color: var(--font-color-1);
            background-color: transparent;
            border: 1px solid var(--background-2-inverse);
        }

        input:hover,
        button:hover,
        input:focus,
        .captcha input {
            background: var(--background-1);
        }
    }

    main,
    .captcha {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    main {
        position: relative;
        justify-content: center;

        background-color: var(--background-1);

        width: 100%;
        height: 100%;
    }

    .captcha {
        gap: 0.2rem;
        padding: 0.2rem;
        border-radius: 0.2rem;
        background: rgb(153, 13, 27);

        label {
            color: white;
        }
    }
</style>

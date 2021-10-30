<!-- 
    Esse arquivo foi adaptado de um seletor de imagens que eu já havia criado.
    Reutilizei ele pra não perder tempo recriando
 -->
<script>
    export let setImage = (_) => null;
    export let imageURL = "";

    function handleChange(e) {
        const target = e.target;

        if (!(target.files && target.files[0])) return;

        const fr = new FileReader();

        fr.addEventListener("load", () => {
            if (fr.result) setImage(imageURL = fr.result.toString());
        });

        fr.readAsDataURL(target.files[0]);
    }
</script>

<div class="container">
    <label class="hover_display" for="avatar">
        <svg
            width="88"
            height="88"
            viewBox="56 56 88 88"
            xmlns="http://www.w3.org/2000/svg"
            class="plus_image"
        >
            <rect
                stroke-width="0"
                fill="#7F7EFF"
                height="88"
                width="16"
                y="56"
                x="92"
            />
            <rect
                transform="rotate(90 100 100)"
                fill="#7F7EFF"
                stroke-width="0"
                height="88"
                width="16"
                y="56"
                x="92"
            />
        </svg>
    </label>

    <span class="selected_image">
        {#if imageURL}
            <img src={imageURL} alt="Imagem" />
        {:else}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                id="svg8"
                viewBox="7.5 5.5 9 13"
                height="200"
                width="200"
                class="unknown"
            >
                <g style="strokeWidth: 0.12017167">
                    <path
                        style="fill: none ; strokeWidth: 0.12017167"
                        d="M 0,0 H 24 V 24 H 0 Z"
                    />
                    <path
                        style="strokeWidth: 0.12017167"
                        d="m 11,18 h 2 V 16 H 11 Z M 12,6 C 9.79,6 8,7.79 8,10 h 2 c 0,-1.1 0.9,-2 2,-2 1.1,0 2,0.9 2,2 0,2 -3,1.75 -3,5 h 2 c 0,-2.25 3,-2.5 3,-5 0,-2.21 -1.79,-4 -4,-4 z"
                    />
                </g>
            </svg>
        {/if}
    </span>

    <input
        style="display: none"
        type="file"
        name="avatar"
        id="avatar"
        accept="image/png, image/jpeg"
        on:change={handleChange}
    />
</div>

<style scoped lang="scss">
    .container {
        display: block;

        width: 100%;
        height: 100%;

        background-color: var(--background-0);

        aspect-ratio: 1/1;

        margin: 0;
        border-radius: 50%;

        position: relative;

        .hover_display,
        .selected_image {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .hover_display {
            position: absolute;

            left: 0;
            top: 0;

            width: 100%;
            height: 100%;

            z-index: 2;

            cursor: pointer;
            transition: opacity 200ms ease;

            opacity: 0;

            border-radius: inherit;

            background-color: var(--background-0);

            gap: 1rem;

            &:hover {
                opacity: 0.8;
            }
        }

        .selected_image {
            width: 100%;
            height: 100%;

            border-radius: inherit;

            .unknown {
                fill: var(--background-0-inverse);

                opacity: 0.2;

                width: 5rem;
                height: 5rem;
            }
        }

        img,
        svg {
            width: 100%;
            height: 100%;

            border-radius: inherit;
        }

        .plus_image {
            position: relative;

            width: 3rem;
            height: 3rem;
        }

        // .hover_display::after {
        //     content: "Adicione uma imagem";
        //     display: inline-block;

        //     width: 100%;
        //     text-align: center;

        //     position: absolute;

        //     color: var(--background-0-inverse);

        //     font-size: 0.9rem;

        //     left: 50%;
        //     bottom: 1rem;

        //     transform: translateX(-50%);
        // }
    }
</style>

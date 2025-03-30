<script lang="ts">
    import type { Word } from "$lib/words";
    import { fly } from "svelte/transition";

    let word: Word | null = null;

    async function roll() {
        const response = await fetch("/word");

        word = await response.json();
    }
    
    const flyOption = { y: 20, duration: 500 };
</script>

<div id="box">
    <button id="gen" on:click={roll}>Generate</button>

    {#if word === null}
        <p id="guide">🔥 Hit the button to get a random rare word! 🔥</p>
    {:else}
        <p id="guide">💎 Do you like it? 💎</p>
    {/if}

    {#if word !== null}
        {#key word}
            <div id="word" in:fly|global={flyOption}>
                <p class="word-name">{word.name}</p>
                <p class="word-description">{word.description}</p>
            </div>
        {/key}
    {/if}
</div>

<style>
    #box {
        display: grid;
        width: 800px;
        margin: 0 auto;
        padding: 10vh 0;
        grid-column: 1;
        gap: 2.5em;
    }
    #gen {
        display: block;
        margin: 0 auto;
        padding: 0.5em 1em;
        font-size: 1em;
    }
    #guide {
        text-align: center;
    }
    p {
        margin: 0;
    }
    #word {
        margin: 0 auto;
        text-align: center;
    }
    .word-name {
        font-size: 4em;
    }
    .word-description {
        font-size: 2em;
        color: #999;
    }
</style>
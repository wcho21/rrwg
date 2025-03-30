<script lang="ts">
    import type { Word } from "$lib/words";

    let word: Word | null = $state(null);

    async function roll() {
        const response = await fetch("/word");

        word = await response.json();
    }
</script>

<button onclick={roll}>Generate</button>

{#if word !== null}
    <p>
        <span style="font-size: 4em;">{word.name} {word.description}</span>
    </p>
{/if}
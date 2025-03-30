<script lang="ts">
    let word = $state("");

    async function roll() {
        const response = await fetch("/word");

        word = await response.json();
    }
</script>

<button onclick={roll}>Generate</button>

{#if word !== ""}
    <p>
        <span style="font-size: 4em;">{word}</span>
    </p>
{/if}
<script lang="ts">
  import type { Word } from "$lib/words";
  import { fly } from "svelte/transition";

  const undeterminedWord = { name: "?", description: "" };
  let word: Word = $state(undeterminedWord);
  let rolling = $state(false);

  async function roll(): Promise<void> {
    rolling = true;

    const response = await fetch("/word");

    word = await response.json();
    rolling = false;
  }

  function isWordDetermined(): boolean {
    return word.name !== undeterminedWord.name;
  }

  const flyOption = { y: 20, duration: 500 };
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wdth,wght@87.5,100..900&display=swap" rel="stylesheet">
</svelte:head>

<div id="outermost-wrapper" class="noto-serif weight-400">
  <h1 id="heading" class="weight-700">Rare Word Generator</h1>

  <div id="main-wrapper">
    <button id="roll" onclick={roll}>🎲</button>
    <p id="rolling-state" class={rolling ? "shown" : "hidden"}>Rolling...</p>

    {#if isWordDetermined()}
      {#key word.name}
        <div id="word" in:fly|global={flyOption}>
          <p id="word-name" class="weight-700">{word.name}</p>
          <p id="word-description">{word.description}</p>
        </div>
      {/key}
    {/if}

    <p id="guide" class="weight-500">
      {#if isWordDetermined()}
        💎 I've found the right one for you. 💎
      {:else}
        🔥 Hit the dice! 🔥
      {/if}
    </p>
  </div>
</div>

<style>
  p, h1 {
    margin: 0;
  }

  #outermost-wrapper {
    position: relative;
    max-width: 800px;
    margin: 15vh auto 0 auto;
    padding: 20px;
    text-align: center;
  }

  #heading {
    color: transparent;
    position: relative;
    font-size: 48px;
    z-index: 1;
    background-clip: text;
    background-image: linear-gradient(0deg, #d0d0d0 0%, #e0e0e0 50%, #e9e9e9 100%);
  }
  @media screen and (max-width: 600px) {
    #heading {
      font-size: 30px;
    }
  }

  #rolling-state {
    margin-top: 6px;
    font-size: 18px;
  }
  @media screen and (max-width: 600px) {
    #rolling-state {
      font-size: 12px;
    }
  }

  #main-wrapper {
    position: relative;
    margin-top: -0.825em;
    padding: 20px;
    z-index: 2;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.125) 0px 0px 15px;

    background-color: #fff;
  }
  @media screen and (max-width: 600px) {
    #main-wrapper {
      margin-top: -0.5em;
    }
  }

  #roll {
    padding: 10px 20px;
    background-color: #fff;
    font-size: 36px;
    border: none;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.125) 0px 0px 5px;
    transition-property: transform, box-shadow, background-color;
    transition-duration: 0.1s, 0.1s, 0.1s;
  }
  @media screen and (max-width: 600px) {
    #roll {
      font-size: 24px;
    }
  }

  #roll:hover {
    transition-property: transform, box-shadow, background-color;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 5px;
    transform: scale(1.0625);
    transition-duration: 0.1s, 0.1s, 0.1s;
  }

  #roll:active {
    transition-property: background-color;
    background-color: #abcdef;
    transition-duration: 0.1s;
  }

  #guide {
    margin-top: 20px;
    font-size: 18px;
  }
  @media screen and (max-width: 600px) {
    #guide {
      font-size: 14px;
    }
  }

  #word {
    margin: 40px 0 60px 0;
  }

  #word-name {
    font-size: 60px;
  }
  @media screen and (max-width: 600px) {
    #word-name {
      font-size: 34px;
    }
  }

  #word-description {
    font-size: 18px;
  }
  @media screen and (max-width: 600px) {
    #word-description {
      font-size: 14px;
    }
  }

  .noto-serif {
    font-family: "Noto Serif Display", serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings:
      "wdth" 87.5;
  }

  .weight-400 {
    font-weight: 400;
  }

  .weight-500 {
    font-weight: 500;
  }

  .weight-700 {
    font-weight: 700;
  }

  .shown {
    opacity: 1;
    transition-property: opacity;
    transition-duration: 0.3s;
  }

  .hidden {
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.3s;
  }
</style>

import { json } from "@sveltejs/kit";
import { words } from "./words";

export function GET() {
    const word = getRandomWord();

    return json(word);
}

// TODO: a separate function to hide the details; fix to give a rare word
function getRandomWord(): string {
    // TODO: faking a random word; fix to give a real rare word
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];

    return `${word.name}, ${word.description} (${word.part})`;
}
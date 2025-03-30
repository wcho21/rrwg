import { json } from "@sveltejs/kit";
import { faker } from "@faker-js/faker";

export function GET() {
    const word = getRandomWord();

    return json(word);
}

// TODO: a separate function to hide the details; fix to give a rare word
function getRandomWord(): string {
    // TODO: give a rare word
    const word = faker.word.noun();

    return word;
}
import { json } from "@sveltejs/kit";
import { selectRandomWord } from "$lib/words";

export function GET() {
    const word = selectRandomWord();

    return json(word);
}
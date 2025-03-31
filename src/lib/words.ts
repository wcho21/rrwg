import words from "./words.json";
import { random } from "lodash-es";

export interface Word {
  name: string;
  description: string;
}

export function selectRandomWord(): Word {
  const randomIndex = random(0, words.length);
  const [name, description] = words[randomIndex];
  const randomWord = { name, description };

  return randomWord;
}

import { error } from "@sveltejs/kit";
import Database from "better-sqlite3";

const database = new Database("./words.db");

export interface Word {
    name: string,
    description: string,
}

export function selectRandomWord(): Word {
    const sql = "SELECT name, description FROM words WHERE id = ((SELECT ABS(RANDOM())) % (SELECT MAX(id) FROM words) + 1) LIMIT 1";
    const selected = database.prepare<unknown[], Word>(sql).get();

    if (selected === undefined) {
        error(500);
    }

    return selected;
}

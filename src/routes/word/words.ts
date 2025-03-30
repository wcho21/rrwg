export type Part = "noun" | "pronoun" | "verb" | "adjective" | "adverb" | "proposition" | "conjunction" | "interjection";

export interface Word {
    name: string;
    description: string;
    part: Part;
};

export const words: Word[] = [
    gen("name1", "desc1", "noun"),
    gen("name2", "desc2", "pronoun"),
    gen("name3", "desc3", "verb"),
    gen("name4", "desc4", "adjective"),
    gen("name5", "desc5", "proposition"),
    gen("name6", "desc6", "conjunction"),
    gen("name7", "desc7", "interjection"),
];

function gen(name: string, description: string, part: Part): Word {
    return { name, description, part };
}
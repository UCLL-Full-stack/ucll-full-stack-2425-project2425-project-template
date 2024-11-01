export type User = {
    id?: number;
    name?: string;
    characters?: Array<Character>;
    score?: number;
  }



export type Character = {
    id?: number;
    name?: string;
    money?: number;
}
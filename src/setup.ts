import kebab from "./audio/kebab.m4a";
import jingle from "./audio/jingle.m4a";

export interface Source {
  id: number;
  url: string;
  name: string;
  audio: HTMLAudioElement | null;
}

export const DEFAULT_SOURCES: Source[] = [
  { id: 1, url: kebab, name: "Kebab", audio: null },
  { id: 2, url: jingle, name: "Jingle", audio: null },
];

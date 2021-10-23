import kebab from "./audio/kebab.m4a";
import plynatost from "./audio/patrick-star-plynatost.mp3";

export interface Source {
  id: number;
  url: string;
  name: string;
  audio: HTMLAudioElement | null;
  image: string;
}

export const DEFAULT_SOURCES: Source[] = [
  {
    id: 1,
    url: kebab,
    name: "Kebab",
    audio: null,
    image: "/kebab.jpg",
  },
  {
    id: 2,
    url: plynatost,
    name: "Plynatost",
    audio: null,
    image: "/plynatost.jpg",
  },
];

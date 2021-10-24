import kebab from "./audio/kebab.m4a";
import plynatost from "./audio/patrick-star-plynatost.mp3";
import jebeVam from "./audio/jebe-vam.m4a";
import anoJeToTak from "./audio/ano-je-to-tak.m4a";
import stayTuned from "./audio/stay-tuned.m4a";
import odMikrofonuSeHlasi from "./audio/od-mikrofonu-se-hlasi.m4a";
import krauns from "./audio/krauns.mp3";
import vidle from "./audio/vidle.mp3";
import auMojePrdizna from "./audio/au-moje-prdizna.mp3";

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
    url: jebeVam,
    name: "Jebe vám?",
    audio: null,
    image: "/patrick.jpg",
  },
  {
    id: 2,
    url: plynatost,
    name: "Plynatost",
    audio: null,
    image: "/plynatost.jpg",
  },
  {
    id: 3,
    url: stayTuned,
    name: "Stay tuned!",
    audio: null,
    image: "/patricius.jpg",
  },
  {
    id: 4,
    url: anoJeToTak,
    name: "Ano, je to tak!",
    audio: null,
    image: "/patricius.jpg",
  },
  {
    id: 5,
    url: kebab,
    name: "Kebab",
    audio: null,
    image: "/kebab.jpg",
  },
  {
    id: 6,
    url: vidle,
    name: "Vidle!",
    audio: null,
    image: "/patrick.jpg",
  },
  {
    id: 7,
    url: krauns,
    name: "Krauns",
    audio: null,
    image: "/patrick.jpg",
  },
  {
    id: 8,
    url: odMikrofonuSeHlasi,
    name: "Od mikrofonu se hlásí",
    audio: null,
    image: "/patricius.jpg",
  },
  {
    id: 9,
    url: auMojePrdizna,
    name: "Au, moje prdízna!",
    audio: null,
    image: "/patrick.jpg",
  },
];

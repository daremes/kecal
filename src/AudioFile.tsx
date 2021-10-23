import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createUseStyles } from "react-jss";
import { LoadedSound } from "./App";
import { Source } from "./setup";

interface StyleOptions {
  image: string;
}

const useStyles = createUseStyles({
  wrapper: {
    width: 80,
    height: 80,
    border: "1px solid #ccc",
  },
  button: ({ image }: StyleOptions) => ({
    position: "relative",
    width: 80,
    height: 80,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    padding: 0,
  }),
  scrim: {
    position: "absolute",
    width: 78,
    height: 78,
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.2)",
    display: "flex",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      background: "rgba(0,0,0,0.4)",
    },
    "&:active": {
      background: "rgba(0,0,0,0.6)",
    },
    textTransform: "uppercase",
    fontSize: 12,
  },
});
interface Props {
  loadedSounds: LoadedSound[];
  setLoadedSounds: Dispatch<SetStateAction<LoadedSound[]>>;
  source: Source;
}

interface GetInfo {
  loading: boolean;
  name: string;
  playing: boolean;
}

const getInfo = ({ playing, name, loading }: GetInfo) => {
  if (playing) {
    return <div>...</div>;
  }
  if (loading) {
    return <div>loading</div>;
  }
  return <div>{name}</div>;
};

export default function AudioFile({
  source,
  loadedSounds,
  setLoadedSounds,
}: Props) {
  const [sound, setSound] = useState(source);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const classes = useStyles({
    image: source.image,
  });

  useEffect(() => {
    const loadAudioFile = (src: Source) => {
      const audio = new Audio(src.url);
      const onAudioLoaded = () => {
        audio.removeEventListener("canplaythrough", onAudioLoaded);
        const updatedSource = { ...src };
        updatedSource.audio = audio;
        setLoadedSounds((prev) => [...prev, { id: source.id, audio: audio }]);
        setSound(updatedSource);
        setLoading(false);
      };
      const onEnded = () => {
        setPlaying(false);
      };
      const onPause = () => {
        setPlaying(false);
      };
      audio.addEventListener("canplaythrough", onAudioLoaded);
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("pause", onPause);
      audio.load();
    };
    loadAudioFile(source);
  }, [source]);

  const pauseOthers = (id: number) => {
    loadedSounds
      .filter((snd) => snd.id !== id)
      .forEach(({ audio }) => {
        audio.pause();
      });
  };

  return (
    <div className={classes.wrapper}>
      <button
        className={classes.button}
        onClick={() => {
          if (sound.audio) {
            if (sound.audio.paused) {
              pauseOthers(source.id);
              sound.audio.currentTime = 0;
              sound.audio.play();
              setPlaying(true);
            } else {
              sound.audio.pause();
            }
          }
        }}
      >
        <div className={classes.scrim}>
          {getInfo({ loading, playing, name: source.name })}
        </div>
      </button>
    </div>
  );
}

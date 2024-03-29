import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import { createUseStyles } from "react-jss";
import { AutoplayCB, LoadedSound } from "./App";
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
  text: {
    margin: "0 4px",
  },
  progress: {
    position: "absolute",
    width: "0%",
    height: 4,
    left: 0,
    bottom: 0,
    background: "#fff",
  },
});
interface Props {
  autoplayId?: number;
  loadedSounds: LoadedSound[];
  setLoadedSounds: Dispatch<SetStateAction<LoadedSound[]>>;
  setLink: Dispatch<SetStateAction<string>>;
  setOnPlay: Dispatch<SetStateAction<AutoplayCB>>;
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
  autoplayId,
  source,
  loadedSounds,
  setLoadedSounds,
  setLink,
  setOnPlay,
}: Props) {
  const [sound, setSound] = useState(source);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);

  const classes = useStyles({
    image: source.image,
  });

  const handleLink = () => {
    const getPathFromUrl = (url: string) => {
      return url.split(/[?#]/)[0];
    };
    const url = window.location.href;
    const path = getPathFromUrl(url);
    const link = `${path}?id=${source.id}`;
    setLink(link);
  };

  const pauseOthers = (id: number) => {
    loadedSounds
      .filter((snd) => snd.id !== id)
      .forEach(({ audio }) => {
        audio.pause();
      });
  };

  const play = () => {
    if (sound.audio) {
      if (sound.audio.paused) {
        pauseOthers(source.id);
        sound.audio.currentTime = 0;
        sound.audio.play();
        setPlaying(true);
        handleLink();
      } else {
        sound.audio.pause();
      }
    }
  };

  useEffect(() => {
    if (autoplayId === source.id && sound.audio) {
      setOnPlay({ play });
    }
  }, [autoplayId, sound]);

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
      const onTimeUpdate = () => {
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        const progress = (currentTime / duration) * 100;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
      };
      audio.addEventListener("canplaythrough", onAudioLoaded);
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("pause", onPause);
      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.load();
    };
    loadAudioFile(source);
  }, [source]);

  return (
    <div className={classes.wrapper}>
      <button className={classes.button} onClick={play}>
        <div className={classes.scrim}>
          <div className={classes.text}>
            {getInfo({ loading, playing, name: source.name })}
          </div>
        </div>
        {playing && <div className={classes.progress} ref={progressRef} />}
      </button>
    </div>
  );
}

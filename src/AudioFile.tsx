import { useState, useEffect } from "react";
import { Source } from "./setup";

interface Props {
  source: Source;
}

export default function AudioFile({ source }: Props) {
  const [sound, setSound] = useState(source);

  useEffect(() => {
    const loadAudioFile = (src: Source) => {
      const audio = new Audio(src.url);
      const onAudioLoaded = () => {
        audio.removeEventListener("canplaythrough", onAudioLoaded);
        const updatedSource = { ...src };
        updatedSource.audio = audio;
        setSound(updatedSource);
      };
      audio.addEventListener("canplaythrough", onAudioLoaded);
      audio.load();
    };
    loadAudioFile(source);
  }, [source]);

  return (
    <div>
      <button
        onClick={() => {
          if (sound.audio) {
            if (sound.audio.paused) {
              sound.audio.currentTime = 0;
              sound.audio.play();
            } else {
              sound.audio.pause();
            }
          }
        }}
      >
        {sound.audio ? sound.name : "loading"}
      </button>
    </div>
  );
}

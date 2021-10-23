import AudioFile from "./AudioFile";
import { DEFAULT_SOURCES } from "./setup";
import injectSheet, { createUseStyles } from "react-jss";
import Content from "./Content";
import { useState } from "react";

const style = {
  "@global": {
    body: {
      margin: 0,
      fontFamily: `'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
    },
  },
};

const useStyles = createUseStyles({
  header: {
    width: "100%",
    height: 48,
    display: "flex",
    alignItems: "center",
    background: "#000",
    color: "#fff",
    boxShadow: "0 1px 2px 2px rgba(0,0,0,0.25)",
  },
  headerContent: {
    margin: "0 24px",
  },
  container: {
    margin: "24px 24px 0",
    display: "flex",
  },
});

export interface LoadedSound {
  id: number;
  audio: HTMLAudioElement;
}

function App() {
  const classes = useStyles();
  const [loadedSounds, setLoadedSounds] = useState<LoadedSound[]>([]);

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.headerContent}>Kecal</div>
      </div>
      <Content>
        <div className={classes.container}>
          {DEFAULT_SOURCES.map((source, i) => (
            <div key={source.id}>
              <AudioFile
                source={source}
                loadedSounds={loadedSounds}
                setLoadedSounds={setLoadedSounds}
              />
            </div>
          ))}
        </div>
      </Content>
    </div>
  );
}

export default injectSheet(style)(App);

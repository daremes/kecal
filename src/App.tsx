import AudioFile from "./AudioFile";
import { DEFAULT_SOURCES } from "./setup";
import injectSheet, { createUseStyles } from "react-jss";
import Content from "./Content";
import { useEffect, useState } from "react";

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
    background: "#f542c2",
    color: "#fff",
    boxShadow: "0 1px 1px 2px rgba(0,0,0,0.15)",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerContent: {
    margin: "0 24px",
  },
  container: {
    position: "relative",
    margin: "24px 24px 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    minWidth: 300,
    minHeight: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    boxShadow: "0 1px 1px 2px rgba(0,0,0,0.2)",
  },
  modalWrapper: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0, 0.7)",
  },
  playButton: {
    background: "#f542c2",
    color: "#fff",
  },
  closeButton: {
    color: "#777",
    textDecoration: "underline",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  link: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    "& a": {
      color: "#777",
    },
  },
});

export interface LoadedSound {
  id: number;
  audio: HTMLAudioElement;
}

function App() {
  const classes = useStyles();
  const [loadedSounds, setLoadedSounds] = useState<LoadedSound[]>([]);
  const [autoplayId, setAutoplayId] = useState<number>();
  const [showDialog, setShowDialog] = useState<number>();
  const [link, setLink] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("id")) {
      const id = Number(params.get("id"));
      setShowDialog(id);
    }
  }, []);

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.headerContent}>Kecal</div>
      </div>
      {showDialog !== undefined && (
        <div className={classes.modalWrapper}>
          <div className={classes.modal}>
            <b style={{ marginBottom: 24 }}>Někdo ti něco poslal</b>
            <button
              className={classes.playButton}
              onClick={() => {
                setAutoplayId(showDialog);
                setShowDialog(undefined);
              }}
            >
              Přehrát
            </button>
            <button
              className={classes.closeButton}
              onClick={() => {
                setShowDialog(undefined);
              }}
            >
              Zavřít
            </button>
          </div>
        </div>
      )}
      <Content>
        <div className={classes.container}>
          {DEFAULT_SOURCES.map((source, i) => (
            <div key={source.id}>
              <AudioFile
                autoplayId={autoplayId}
                source={source}
                loadedSounds={loadedSounds}
                setLoadedSounds={setLoadedSounds}
                setLink={setLink}
              />
            </div>
          ))}
        </div>
      </Content>
      {link && (
        <div className={classes.link}>
          <a href={link}>Odkaz na poslední přehraný zvuk</a>
        </div>
      )}
    </div>
  );
}

export default injectSheet(style)(App);

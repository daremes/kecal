import "./styles.css";
import AudioFile from "./AudioFile";
import { DEFAULT_SOURCES } from "./setup";

export default function App() {
  return (
    <div className="App">
      {DEFAULT_SOURCES.map((source, i) => (
        <div key={source.id}>
          <AudioFile source={source} />
        </div>
      ))}
    </div>
  );
}

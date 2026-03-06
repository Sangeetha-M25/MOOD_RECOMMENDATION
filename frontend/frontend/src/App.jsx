import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("happy"); // default mood
  const [video, setVideo] = useState([]);

  const getVideo = async () => {
    try {
      const res = await axios.post("https://mood-recommendation-1-fjr4.onrender.com/", { text: text });
      setVideo(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setVideo([]);
    }
  };

  return (
    <div className="app">
      <h1>Mood Based Video Recommender</h1>

      <input
        placeholder="How is your mood today? (happy, sad, relaxed)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={getVideo}>Predict</button>

      <div className="video">
        {video.map((v) => {
          return (
            <iframe
              width="1013"
              height="570"
              key={v.id.videoId}
              src={`https://www.youtube.com/embed/${v.id.videoId}`}
              title={v.snippet.title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

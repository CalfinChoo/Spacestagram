import { useState, useEffect } from "react";
import Post from "./components/Post";
import "./App.css";

function App() {
  // const [history, updateHistory] = useState([
  //   [...Array(9).keys()].map((i) => null),
  // ]);
  const [apod, updateApod] = useState({
    items: [],
    DataIsLoaded: false,
  });

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=" +
        process.env.REACT_APP_NASA_API_KEY
    )
      .then((res) => res.json())
      .then((json) =>
        updateApod({
          items: json,
          DataIsLoaded: true,
        })
      );
  }, []);

  // useEffect(() => {
  //   console.log(apod);
  // }, [apod]);

  return (
    <div className="App">
      <h1>Spacetagram</h1>
      <div className="posts">
        <Post data={apod} />
        <Post data={apod} />
      </div>
    </div>
  );
}

export default App;

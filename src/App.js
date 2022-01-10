import { useState, useEffect } from "react";
import Apod from "./components/Apod";
import Header from "./components/Header";
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
  const [posts, updatePosts] = useState({
    items: [],
    metadata: {},
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
    fetch("https://images-api.nasa.gov/search?q=cosmos&media_type=image")
      .then((res) => res.json())
      .then((json) => {
        updatePosts({
          items: json.collection.items,
          metadata: json.collection.metadata,
          DataIsLoaded: true,
        });
      });
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div className="App">
      <Header />
      <div className="apodZ">
        <Apod data={apod} />
      </div>
      <div className="posts">
        <div className="postsContainer">
          {posts.items.map((post, i) => {
            return <Post data={post} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

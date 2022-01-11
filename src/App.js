import { useState, useEffect } from "react";
import Apod from "./components/Apod";
import Header from "./components/Header";
import Post from "./components/Post";
import ModalComponent from "./components/ModalComponent";

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
  const [modalIsOpen, updateIsOpen] = useState(false);
  const [modalInfo, updateModalInfo] = useState({
    data: {},
    DataIsLoaded: false,
  });

  function openModal(modalData) {
    updateIsOpen(true);
    updateModalInfo({
      data: modalData,
      DataIsLoaded: true,
    });
  }
  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // }
  function closeModal() {
    updateIsOpen(false);
    updateModalInfo([]);
  }

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
    fetch("https://images-api.nasa.gov/search?q=cosmic&media_type=image")
      .then((res) => res.json())
      .then((json) => {
        updatePosts({
          items: json.collection.items.slice(0, 99),
          metadata: json.collection.metadata,
          DataIsLoaded: true,
        });
      });
  }, []);

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  useEffect(() => {
    modalIsOpen && (document.body.style.overflow = "hidden");
    !modalIsOpen && (document.body.style.overflow = "unset");
    console.log(modalInfo);
  }, [modalIsOpen]);

  return (
    <div className="App">
      <Header />
      <ModalComponent
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalInfo={modalInfo}
      />
      <div className="apodZ">
        <Apod data={apod} />
      </div>
      <div className="posts">
        <div className="postsContainer">
          {posts.items.map((post, i) => {
            return <Post data={post} onClick={openModal} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

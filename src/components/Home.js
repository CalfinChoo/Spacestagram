import React from "react";
import { useState, useEffect } from "react";
import Apod from "./Apod";
import Posts from "./Posts";
import ModalComponent from "./ModalComponent";

import "../css/Home.css";

function Home() {
  const [modalIsOpen, updateIsOpen] = useState(false);
  const [modalInfo, updateModalInfo] = useState({
    data: {},
    DataIsLoaded: false,
  });
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
    fetch("https://images-api.nasa.gov/search?q=explosion&media_type=image")
      .then((res) => res.json())
      .then((json) => {
        updatePosts({
          items: json.collection.items.slice(0, 99),
          metadata: json.collection.metadata,
          DataIsLoaded: true,
        });
      });
  }, []);

  function openModal(modalData) {
    updateIsOpen(true);
    updateModalInfo({
      data: modalData,
      DataIsLoaded: true,
    });
  }

  function closeModal() {
    updateIsOpen(false);
    updateModalInfo([]);
  }

  useEffect(() => {
    modalIsOpen && (document.body.style.overflow = "hidden");
    !modalIsOpen && (document.body.style.overflow = "unset");
    console.log(modalInfo);
  }, [modalIsOpen]);

  return (
    <>
      <ModalComponent
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalInfo={modalInfo}
      />
      <Apod data={apod} />
      <Posts posts={posts} openModal={openModal} />
    </>
  );
}

export default Home;

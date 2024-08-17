import React from "react";
import { useState, useEffect } from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import ReactLoading from "react-loading";
import Apod from "./Apod";
import Posts from "./Posts";
import ModalComponent from "./ModalComponent";
import ScrollButton from "./ScrollButton";

import "../css/Home.css";

function Home() {
  const [modalIsOpen, updateModalIsOpen] = useState(false);
  const [modalInfo, updateModalInfo] = useState({
    data: {},
    liked: false,
    updateLiked: null,
    isApod: false,
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
  const [page, updatePage] = useState(1);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const getApodData = async () => {
    try {
      const request = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=" +
          process.env.REACT_APP_NASA_API_KEY
      );
      const data = await request.json();
      return data;
    } catch (err) {
      return null;
    }
  };

  const getPostData = async () => {
    const initSearch = ["cosmic", "galactic", "supernova", "black%20hole"];
    try {
      const request = await fetch(
        `https://images-api.nasa.gov/search?q=${
          shuffleArray(initSearch)[0]
        }&media_type=image&page=${page}`
      );
      const data = await request.json();
      return data;
    } catch (err) {
      return null;
    }
  };

  const bottomCallback = () => {
    updatePage((prev) => prev + 1);
  };

  const openModal = (modalData, liked, updateLiked, isApod) => {
    updateModalIsOpen(true);
    updateModalInfo({
      data: modalData,
      liked: liked,
      updateLiked: updateLiked,
      isApod: isApod,
      DataIsLoaded: true,
    });
  };

  const closeModal = () => {
    updateModalIsOpen(false);
    updateModalInfo({
      data: {},
      liked: false,
      updateLiked: null,
      isApod: false,
      DataIsLoaded: false,
    });
  };

  useEffect(() => {
    getApodData().then((data) =>
      updateApod({
        items: data,
        DataIsLoaded: data === null ? false : true,
      })
    );
  }, []);

  useEffect(() => {
    getPostData().then((data) => {
      const itemsCopy = [...posts.items];
      const metadataCopy = { ...posts.metadata };
      updatePosts({
        items: itemsCopy.concat(
          data === null ? [] : shuffleArray(data.collection.items)
        ),
        metadata: data === null ? metadataCopy : data.collection.metadata,
        DataIsLoaded: true,
      });
    });
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    modalIsOpen && (document.body.style.overflow = "hidden");
    !modalIsOpen && (document.body.style.overflow = "unset");
  }, [modalIsOpen]);

  return (
    <BottomScrollListener onBottom={bottomCallback}>
      {(scrollRef) => (
        <div className="body" ref={scrollRef}>
          <ModalComponent
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            modalInfo={modalInfo}
          />
          <Apod data={apod} onClick={openModal} />
          {posts.DataIsLoaded && posts.items.length > 0 ? (
            <Posts posts={posts} openModal={openModal} />
          ) : (
            <ReactLoading className="loader" type="bubbles" color="white" />
          )}
          <ScrollButton />
        </div>
      )}
    </BottomScrollListener>
  );
}

export default Home;

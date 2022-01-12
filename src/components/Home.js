import React from "react";
import { useState, useEffect } from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import Apod from "./Apod";
import Posts from "./Posts";
import ModalComponent from "./ModalComponent";
import ScrollButton from "./ScrollButton";

import "../css/Home.css";

function Home() {
  const [modalIsOpen, updateIsOpen] = useState(false);
  const [modalInfo, updateModalInfo] = useState({
    data: {},
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

  const getPostData = async () => {
    const request = await fetch(
      `https://images-api.nasa.gov/search?q=space&media_type=image&page=${page}`
    );
    const data = await request.json();
    return data;
  };

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

  useEffect(() => {
    getPostData().then((data) => {
      const itemsCopy = [...posts.items];
      updatePosts({
        items: itemsCopy.concat(data.collection.items),
        metadata: data.collection.metadata,
        DataIsLoaded: true,
      });
    });
  }, [page]);

  const bottomCallback = () => {
    updatePage((prev) => prev + 1);
  };

  const openModal = (modalData, isApod) => {
    updateIsOpen(true);
    updateModalInfo({
      data: modalData,
      isApod: isApod,
      DataIsLoaded: true,
    });
  };

  const closeModal = () => {
    updateIsOpen(false);
    updateModalInfo({
      data: {},
      isApod: false,
      DataIsLoaded: false,
    });
  };

  useEffect(() => {
    modalIsOpen && (document.body.style.overflow = "hidden");
    !modalIsOpen && (document.body.style.overflow = "unset");
  }, [modalIsOpen]);

  useEffect(() => {
    console.log(apod);
  }, [apod]);

  return (
    <>
      <ModalComponent
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalInfo={modalInfo}
      />
      <Apod data={apod} onClick={openModal} />
      {posts.DataIsLoaded && <Posts posts={posts} openModal={openModal} />}
      <ScrollButton />
      <BottomScrollListener onBottom={bottomCallback} />;
    </>
  );
}

export default Home;

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import Posts from "./Posts";
import ModalComponent from "./ModalComponent";

function Search() {
  const [modalIsOpen, updateIsOpen] = useState(false);
  const [modalInfo, updateModalInfo] = useState({
    data: {},
    DataIsLoaded: false,
  });
  const [posts, updatePosts] = useState({
    items: [],
    metadata: {},
    DataIsLoaded: false,
  });
  const [page, updatePage] = useState(1);
  const [search, updateSearch] = useState("");

  let { searchId } = useParams();

  const getPostData = async () => {
    const request = await fetch(
      `https://images-api.nasa.gov/search?q=${searchId}&media_type=image&page=${page}`
    );
    const data = await request.json();
    return data;
  };

  useEffect(() => {
    updateSearch(searchId);
  }, []);

  useEffect(() => {
    updatePosts({
      items: [],
      metadata: {},
      DataIsLoaded: false,
    });
    updatePage(1);
    updateSearch(searchId);
  }, [searchId]);

  useEffect(() => {
    getPostData().then((data) => {
      const itemsCopy = [...posts.items];
      updatePosts({
        items: itemsCopy.concat(data.collection.items),
        metadata: data.collection.metadata,
        DataIsLoaded: true,
      });
    });
  }, [page, search]);

  const bottomCallback = () => {
    updatePage((prev) => prev + 1);
  };

  const openModal = (modalData) => {
    updateIsOpen(true);
    updateModalInfo({
      data: modalData,
      DataIsLoaded: true,
    });
  };

  const closeModal = () => {
    updateIsOpen(false);
    updateModalInfo({
      data: {},
      DataIsLoaded: false,
    });
  };

  useEffect(() => {
    modalIsOpen && (document.body.style.overflow = "hidden");
    !modalIsOpen && (document.body.style.overflow = "unset");
  }, [modalIsOpen]);

  return (
    <>
      <ModalComponent
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalInfo={modalInfo}
      />
      {posts.DataIsLoaded && <Posts posts={posts} openModal={openModal} />}
      <BottomScrollListener onBottom={bottomCallback} />;
    </>
  );
}

export default Search;

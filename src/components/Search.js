import React from "react";
import { useState, useEffect, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import ReactLoading from "react-loading";
import DatePicker from "react-datepicker";
import Posts from "./Posts";
import ModalComponent from "./ModalComponent";
import ScrollButton from "./ScrollButton";

import "react-datepicker/dist/react-datepicker.css";
import "../css/Home.css";
import "../css/Search.css";

function Search() {
  const [modalIsOpen, updateIsOpen] = useState(false);
  const [modalInfo, updateModalInfo] = useState({
    data: {},
    liked: false,
    updateLiked: null,
    DataIsLoaded: false,
  });
  const [posts, updatePosts] = useState({
    items: [],
    metadata: { total_hits: 0 },
    DataIsLoaded: false,
  });
  const [page, updatePage] = useState(1);
  const [search, updateSearch] = useState("");
  const [date, updateDate] = useState(null);

  let { searchId } = useParams();

  const getPostData = async () => {
    try {
      const request = await fetch(
        date
          ? `https://images-api.nasa.gov/search?q=${searchId}&media_type=image&page=${page}&year_start=${date.getFullYear()}`
          : `https://images-api.nasa.gov/search?q=${searchId}&media_type=image&page=${page}`
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

  const openModal = (modalData, liked, updateLiked) => {
    updateIsOpen(true);
    updateModalInfo({
      data: modalData,
      liked: liked,
      updateLiked: updateLiked,
      DataIsLoaded: true,
    });
  };

  const closeModal = () => {
    updateIsOpen(false);
    updateModalInfo({
      data: {},
      liked: false,
      updateLiked: null,
      DataIsLoaded: false,
    });
  };

  useEffect(() => {
    updateSearch(searchId);
    // eslint-disable-next-line
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
      const metadataCopy = { ...posts.metadata };
      updatePosts({
        items: itemsCopy.concat(data === null ? [] : data.collection.items),
        metadata: data === null ? metadataCopy : data.collection.metadata,
        DataIsLoaded: true,
      });
    });
    // eslint-disable-next-line
  }, [page, search]);

  useEffect(() => {
    getPostData().then((data) => {
      updatePosts({
        items: data === null ? [] : data.collection.items,
        metadata: data === null ? { total_hits: 0 } : data.collection.metadata,
        DataIsLoaded: true,
      });
    });
    // eslint-disable-next-line
  }, [date]);

  const DateInput = forwardRef(
    ({ onChange, placeholder, value, isSecure, id, onClick }, ref) => (
      <input
        className="dateInput"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        issecure={isSecure}
        id={id}
        onClick={onClick}
        ref={ref}
      />
    )
  );

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
      {posts.DataIsLoaded && (
        <div className="searchInfo">
          <div className="searchInfoContainer">
            <span className="hits">{posts.metadata.total_hits} results</span>
            <div className="dateContainer">
              <span className="dateText">Date: </span>
              <DatePicker
                selected={date}
                onChange={(newDate) => updateDate(newDate)}
                customInput={<DateInput />}
                placeholderText="Starting Date"
                showYearPicker
                dateFormat="yyyy"
              />
            </div>
          </div>
        </div>
      )}
      {posts.DataIsLoaded ? (
        <Posts posts={posts} openModal={openModal} />
      ) : (
        <ReactLoading className="loader" type="bubbles" color="white" />
      )}
      <ScrollButton />
      <BottomScrollListener onBottom={bottomCallback} />;
    </>
  );
}

export default Search;

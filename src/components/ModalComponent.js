import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import parse from "html-react-parser";
import CloseIcon from "@mui/icons-material/Close";
import Heart from "react-heart";

import "../css/ModalComponent.css";

function ModalComponent({ modalIsOpen, closeModal, modalInfo }) {
  const [modalLiked, updateModalLiked] = useState(false);

  const handleUpdateLiked = () => {
    modalInfo.updateLiked((prev) => !prev);
    updateModalLiked((prev) => !prev);
  };

  useEffect(() => {
    updateModalLiked(modalInfo.liked);
  }, [modalInfo]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
        appElement={document.getElementById("root")}
      >
        {modalIsOpen && (
          <>
            <div className="modalContainer">
              {modalInfo.isApod ? (
                <div className="modalApodImgContainer">
                  <img className="modalImg" src={modalInfo.data.url} />
                  <div className="modalApodCloseContainer">
                    <CloseIcon className="close" onClick={closeModal} />
                  </div>
                </div>
              ) : (
                <div className="modalImgContainer">
                  <img
                    className="modalImg"
                    src={modalInfo.data.links[0].href}
                  />
                </div>
              )}
              {!modalInfo.isApod && (
                <div className="modalInfo">
                  <div className="modalCloseContainer">
                    <CloseIcon className="close" onClick={closeModal} />
                  </div>
                  <div className="modalDate">
                    {modalInfo.data.data[0].date_created.slice(
                      0,
                      modalInfo.data.data[0].date_created.indexOf("T")
                    )}
                  </div>
                  <div className="modalHeader">
                    <h1 className="modalTitle">
                      {modalInfo.data.data[0].title}
                    </h1>
                    <div className="modalLikes">
                      <div className="heartContainer" title="Like">
                        <Heart
                          className="heart"
                          isActive={modalLiked}
                          onClick={handleUpdateLiked}
                          inactiveColor="white"
                          animationTrigger="both"
                          animationScale={1.2}
                          animationDuration={0.25}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modalBody">
                    <div className="modalDescription">
                      {parse(modalInfo.data.data[0].description)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default ModalComponent;

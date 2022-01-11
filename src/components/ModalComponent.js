import React from "react";
import Modal from "react-modal";
import parse from "html-react-parser";
import CloseIcon from "@mui/icons-material/Close";

import "../css/ModalComponent.css";

function ModalComponent({ modalIsOpen, closeModal, modalInfo }) {
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
              <div className="modalImgContainer">
                <img className="modalImg" src={modalInfo.data.links[0].href} />
              </div>
              <div className="modalInfo">
                <div className="modalCloseContainer">
                  <CloseIcon />
                </div>
                <div className="modalHeader">
                  <h1 className="modalTitle">{modalInfo.data.data[0].title}</h1>
                  <div className="modalLikes"></div>
                </div>
                <div className="modalDescription">
                  {parse(modalInfo.data.data[0].description)}
                </div>
                <div className="modalDate">
                  {modalInfo.data.data[0].date_created.slice(
                    0,
                    modalInfo.data.data[0].date_created.indexOf("T")
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default ModalComponent;

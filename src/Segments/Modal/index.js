import React from "react";
import Modal from "react-modal";
import SavingSegment from "..";
import "./style.css";
import Button from "@mui/material/Button";

const customStyles = {
  content: {
    top: "1%",
    left: "60%",
    right: "auto",
    bottom: "auto",
    height: "90%",
    overflowX: "hidden",
  },
};

Modal.setAppElement("#root");

export default function ModalElement() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "white";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="saveSegment">
      <Button variant="outlined" onClick={openModal}>
        Save segment
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="savingSegment"
        >
          Saving Segment
        </h3>
        <SavingSegment closeModal={closeModal} />
      </Modal>
    </div>
  );
}

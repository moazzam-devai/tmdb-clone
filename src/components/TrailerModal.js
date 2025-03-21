import React from 'react';
import ReactModal from 'react-modal';

const TrailerModal = ({ isOpen, onRequestClose, videoUrl }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Trailer Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="relative">
        <button
          className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-8 h-8"
          onClick={onRequestClose}
        >
          &times;
        </button>
        <iframe
          width="100%"
          height="315"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </ReactModal>
  );
};

export default TrailerModal;

import React from "react";

export default function UploadModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#232323] rounded-lg p-6 w-full max-w-md text-white relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-yellow-400"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-lg font-bold mb-4">Upload Post</div>
        <div className="text-gray-400 mb-4">Upload form goes here.</div>
        <button
          className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
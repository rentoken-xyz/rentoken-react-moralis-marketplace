import React from "react";

export const CardQuickView = ({ visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-2 rounded">
                <p>My modal</p>
                <button onClick={onClose}>X</button>
            </div>
        </div>
    );
};

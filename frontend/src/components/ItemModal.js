import React from 'react';

const ItemModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="modal-backdrop visible" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <img src={item.photo_url} alt={item.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">${parseFloat(item.price).toFixed(2)}</span>
                    <button onClick={onClose} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemModal;

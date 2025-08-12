import React from 'react';

const MenuItemCard = ({ item, onClick }) => (
    <div className="menu-card" onClick={onClick}>
        <img src={item.photo_url} alt={item.name} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm flex-grow">{item.description}</p>
            <p className="text-lg font-bold text-indigo-600 mt-4 text-right">${parseFloat(item.price).toFixed(2)}</p>
        </div>
    </div>
);

export default MenuItemCard;

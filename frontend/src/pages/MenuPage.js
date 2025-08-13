import React, { useEffect, useState } from 'react';
import MenuItemCard from '../components/MenuItemCard'; // Import the card component
import ItemModal from '../components/ItemModal'; // Import the modal component
import Header from '../components/Header'; // Import the header component
import '../styles/MenuPage.css';

function MenuPage() {
    const [menuData, setMenuData] = useState({}); // State to hold the fetched data
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);

    const categories = ['All', ...Object.keys(menuData)];

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                // The URL now points to your Django endpoint
                const response = await fetch('http://127.0.0.1:8000/api/menu/');
                const data = await response.json();
                setMenuData(data);
            } catch (error) {
                console.error("Failed to fetch menu:", error);
            }
        };
        fetchMenu();
    }, []); 

    const filteredItems = activeCategory === 'All'
        ? Object.values(menuData).flat()
        : menuData[activeCategory];

    return (
        <>
            
            <main className="container mx-auto p-4 md:p-8">
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`category-btn px-4 py-2 rounded-full text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors ${activeCategory === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="menu-grid">
                    {filteredItems.map(item => (
                        <MenuItemCard 
                            key={item.id} 
                            item={item} 
                            onClick={() => setSelectedItem(item)} 
                        />
                    ))}
                </div>
            </main>
            <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        </>
    );
}

export default MenuPage;

import React, { useState, useEffect } from 'react';
import '../assets/css/ImageGallery.css';

const ImageGallery = () => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [draggedImage, setDraggedImage] = useState(null);

    useEffect(() => {
        // Fetch images and set the list
        fetch('https://api.unsplash.com/photos/?client_id=TJpu5acykNwz8J5DlKcM-XsP0yv67m6cu67V8rFCwzI')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }
                return response.json();
            })
            .then((data) => {
                const imageList = data
                    .filter((item) => item.alt_description) // Filter out images without a title
                    .map((item) => ({
                        id: item.id,
                        title: item.alt_description,
                        image: item.urls.regular,
                    }));
                setList(imageList);
                setIsLoading(false); // Set loading to false when images are fetched
            })
            .catch((error) => {
                setError(error.message); // Set error message if there is an error
                setIsLoading(false); // Set loading to false
            });
    }, []);

    // Filter images based on the search query
    const filteredList = list.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDragStart = (event, imageId) => {
        event.dataTransfer.setData('text/plain', imageId);
        setDraggedImage(imageId);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, targetImageId) => {
        event.preventDefault();

        const updatedList = [...list];
        const draggedImageIndex = updatedList.findIndex((item) => item.id === draggedImage);
        const targetImageIndex = updatedList.findIndex((item) => item.id === targetImageId);

        if (draggedImageIndex !== -1 && targetImageIndex !== -1) {
            const [draggedImageItem] = updatedList.splice(draggedImageIndex, 1);
            updatedList.splice(targetImageIndex, 0, draggedImageItem);
            setList(updatedList);
        }

        setDraggedImage(null);
    };

    return (
        <section className="container mx-auto mt-8 p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            {error ? (
                <div className="text-center text-red-500">
                    <p>{error}</p>
                </div>
            ) : isLoading ? (
                <div className="text-center text-gray-500">
                    <p>Loading...</p>
                </div>
            ) : filteredList.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>No results found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredList.map((item) => (
                        <div
                            key={item.id}
                            className="bg-blue-300 rounded-md cursor-pointer transform transition-transform hover:scale-105"
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, item.id)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                title={item.title}
                                className="w-full h-40 object-cover rounded-t-md"
                            />
                            <div className="p-2 bg-white rounded-b-md text-center text-sm truncate">
                                {item.title}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ImageGallery;

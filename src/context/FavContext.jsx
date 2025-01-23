import React, { createContext, useContext, useState } from 'react';

// Create a context for favorites
const FavoritesContext = createContext();

// Provider component to wrap your app and provide the context value
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (product) => {
        setFavorites(prevFavorites =>
            prevFavorites.some(fav => fav.id === product.id)
                ? prevFavorites.filter(fav => fav.id !== product.id)
                : [...prevFavorites, product]
        );
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Custom hook to use the favorites context
export const useFavorites = () => useContext(FavoritesContext);

import React from 'react';
import { useFavorites } from '../context/FavContext';

function Fav() {
    const { favorites, toggleFavorite } = useFavorites();

    return (
        <div className="favorites container">
            <h1>Your Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites yet!</p>
            ) : (
                <div className="row">
                    {favorites.map((product) => (
                        <div key={product.id} className="col-sm-4 col-md-3 mb-4">
                            <div className="card">
                                {/* Ensure product.img exists, and use a fallback if not */}
                                <img
                                    src={product.img || 'default_image_url.jpg'} // Replace with a default image URL if no image is found
                                    className="card-img-top"
                                    alt={product.title || 'Product Image'} // Fallback to 'Product Image' if title is missing
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title || 'Untitled Product'}</h5>
                                    <p className="card-text">${product.price || '0.00'}</p>
                                    
                                    {/* Remove from Favorites button */}
                                    <button
                                        className="btn btn-danger ms-2 rounded-pill"
                                        onClick={() => toggleFavorite(product)} // Pass the full product object
                                    >
                                        <i className="fas fa-heart-broken"></i> Remove from Favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Fav;

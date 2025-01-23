import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavContext';
import '../css/store.css';
import { FaSearch } from 'react-icons/fa';  // Importing FontAwesome Search icon

function Store() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [minRating, setMinRating] = useState(0);
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        fetch('/products.json')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesRating = product.rating >= minRating;
        const matchesAvailability = !onlyAvailable || product.available;
        const matchesSearchQuery = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    product.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    (selectedCategory !== 'All Products' && product.category.toLowerCase().includes(searchQuery.toLowerCase()));  // Include category in search query
        return matchesCategory && matchesPrice && matchesRating && matchesAvailability && matchesSearchQuery;
    });

    const isFavorite = (id) => favorites.some(fav => fav.id === id);

    return (
        <div className="main-store">
            <h1>STORE</h1>
            <div className="store container-fluid">
                <div className="side-bar col-md-3">
                    <div className="categories">
                        <h2>Categories</h2>
                        <ul>
                            {['All Products', 'Manga', 'Accessories', 'Clothing', 'Figurines', 'Video Games'].map(category => (
                                <li key={category}>
                                    <button
                                        className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'} w-100`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="filters">
                        <h2>Filters</h2>
                        <div className="form-group">
                            <label className='mb-2'>Price Range:</label>
                            <div className="d-flex align-items-center">
                                <label htmlFor="priceFilterMin" className="me-2">Min:</label>
                                <input
                                    type="range"
                                    id="priceFilterMin"
                                    className="form-range"
                                    min="0"
                                    max={priceRange[1]}
                                    step="1"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                />
                                <span className="ms-2">${priceRange[0]}</span>
                            </div>
                            <div className="d-flex align-items-center mt-2">
                                <label htmlFor="priceFilterMax" className="me-2">Max:</label>
                                <input
                                    type="range"
                                    id="priceFilterMax"
                                    className="form-range"
                                    min={priceRange[0]}
                                    max="200"
                                    step="1"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                />
                                <span className="ms-2">${priceRange[1]}</span>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="ratingFilter">Minimum Rating</label>
                            <select
                                id="ratingFilter"
                                className="form-select my-2"
                                value={minRating}
                                onChange={(e) => setMinRating(Number(e.target.value))}
                            >
                                <option value="0">All Ratings</option>
                                <option value="1">1 Star & Up</option>
                                <option value="2">2 Stars & Up</option>
                                <option value="3">3 Stars & Up</option>
                                <option value="4">4 Stars & Up</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </div>
                        <div className="form-check mt-3 mb-5">
                            <input
                                type="checkbox"
                                id="availabilityFilter"
                                className="form-check-input"
                                checked={onlyAvailable}
                                onChange={(e) => setOnlyAvailable(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="availabilityFilter">Only Show Available</label>
                        </div>
                    </div>
                </div>

                <div className="shop col-md-9">
                    <div className="search-bar mb-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="input-group-text">
                                <FaSearch />
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div key={product.id} className="col-sm-4 col-md-3 mb-4">
                                    <div className="card">
                                        <img
                                            src={product.img}
                                            className="card-img-top"
                                            alt={product.title}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text">${product.price}</p>
                                            <p>Rating: {product.rating} ⭐</p>
                                            {product.available ? (
                                                <Link to={`/product/${product.id}`}>
                                                    <button className="btn btn-primary w-100 mb-2">
                                                        Add to Cart
                                                    </button>
                                                </Link>
                                            ) : (
                                                <button className="btn btn-secondary w-100 mb-2" disabled>
                                                    Unavailable
                                                </button>
                                            )}
                                            <div className="extra-card mt-2">
                                                <p className={`badge ${product.available ? 'bg-success' : 'bg-danger'}`}>
                                                    {product.available ? 'In Stock' : 'Out of Stock'}
                                                </p>
                                                <button
                                                    className="btn btn-danger ms-2 rounded-pill"
                                                    onClick={() => toggleFavorite(product)} // Pass full product
                                                >
                                                    <i className={`fa${isFavorite(product.id) ? 's' : 'r'} fa-heart`}></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products match the selected filters.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Store;

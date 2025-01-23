import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import Cart Context
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Social media icons
import '../css/details.css';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Get addToCart from Cart Context
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState(''); // Message for success or error
    const [messageType, setMessageType] = useState(''); // Type of message: 'success' or 'error'
    const [reviews, setReviews] = useState([]); // State to store reviews
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' }); // New review state

    // Load product and reviews from localStorage or use initial data
    useEffect(() => {
        fetch(`/products.json`)
            .then((response) => response.json())
            .then((data) => {
                const selectedProduct = data.find((item) => item.id === parseInt(id));
                setProduct(selectedProduct);
                const storedReviews = localStorage.getItem(`reviews_${id}`);
                setReviews(storedReviews ? JSON.parse(storedReviews) : []); // Load reviews from localStorage
            })
            .catch((error) => console.error('Error fetching product details:', error));
    }, [id]);

    const handleAddToCart = () => {
        try {
            addToCart(product, quantity);
            setMessage('Product added to cart successfully!');
            setMessageType('success');
        } catch (error) {
            setMessage('Failed to add product to cart. Please try again.');
            setMessageType('error');
        }
    };

    const handleBackToStore = () => {
        navigate('/store');
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (newReview.comment.trim() === '') return;

        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews)); // Save reviews in localStorage
        setNewReview({ rating: 5, comment: '' }); // Reset form
        setMessage('Review submitted successfully!');
        setMessageType('success');
    };

    const handleSocialShare = (platform) => {
        const productUrl = window.location.href;
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${productUrl}&text=${product.title}`;
                break;
            case 'instagram':
                alert('Instagram sharing is not available through a direct URL share.');
                return;
            default:
                return;
        }

        window.open(shareUrl, '_blank');
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details container">
            <button className="btn btn-secondary mb-5 back-button" onClick={handleBackToStore}>
                <i className="fas fa-arrow-left"></i> Back to Store
            </button>
            <div className="details">
                <div className="product">
                    <h1>{product.title}</h1>
                    <img src={product.img} alt={product.title} />
                </div>
                <div className="buttons">
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Rating: {product.rating} ⭐</p>
                    <div className="quantity-controls">
                        <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
                            -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
                        Add to Cart
                    </button>

                    {/* Display success or error message */}
                    {message && (
                        <div className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}
                </div>
                </div>

                {/* Social Media Sharing Section */}
                <div className="social-sharing">
                    <h3>Share this product:</h3>
                    <button onClick={() => handleSocialShare('facebook')}>
                        <FaFacebook /> Share on Facebook
                    </button>
                    <button onClick={() => handleSocialShare('twitter')}>
                        <FaTwitter /> Share on Twitter
                    </button>
                    <button onClick={() => handleSocialShare('instagram')}>
                        <FaInstagram /> Share on Instagram
                    </button>
                </div>

                {/* Reviews Section */}
                <div className="reviews">
                    <h3>Reviews</h3>
                    {reviews.length === 0 ? (
                        <p>No reviews yet. Be the first to review this product!</p>
                    ) : (
                        reviews.map((review, index) => (
                            <div key={index} className="review">
                                <p>Rating: {review.rating} ⭐</p>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Add Review Form */}
                <div className="add-review">
                    <h3>Submit your review</h3>
                    <form onSubmit={handleReviewSubmit}>
                        <div className="form-group">
                            <label>Rating</label>
                            <select
                                value={newReview.rating}
                                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                            >
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <option key={rating} value={rating}>
                                        {rating} Star{rating > 1 && 's'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Comment</label>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit Review
                        </button>
                    </form>
                </div>
        </div>
    );
}

export default ProductDetails;

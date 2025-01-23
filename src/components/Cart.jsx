import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    // Calculate total number of items in the cart
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Calculate total price
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    const handleCheckout = () => {
        navigate('/checkout'); 
    };

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <img src={item.img} alt={item.title} width="100" />
                                <h3>{item.title}</h3>
                                <p>Price: ${item.price}</p>
                                <div>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <p>Total Items: {totalItems}</p>
                        <p>Total Price: ${totalPrice}</p>
                    </div>
                    <button onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
}

export default Cart;

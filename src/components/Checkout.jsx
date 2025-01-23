import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { cart, removeFromCart, resetCart } = useCart();
    const [address, setAddress] = useState({ street: '', city: '', zip: '' });
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [shippingOption, setShippingOption] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Validate form before placing the order
    const validateForm = () => {
        // Check if all required fields are filled
        if (
            !address.street ||
            !address.city ||
            !address.zip ||
            !phone ||
            !email
        ) {
            alert('Please fill out all the fields.');
            return false;
        }

        // Check if the email is in a valid format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Check if the phone number is exactly 11 digits
        const phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(phone)) {
            alert('Phone number must be exactly 11 digits.');
            return false;
        }

        return true;
    };

    const handlePlaceOrder = () => {
        // Only proceed if the form is valid
        if (!validateForm()) {
            return;
        }

        const orderDetails = {
            cart,
            total,
            address,
            phone,
            email,
            shippingOption,
            paymentMethod,
            date: new Date().toISOString(),
        };

        // Save order history in localStorage
        let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        orderHistory.push(orderDetails);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

        // Clear cart (both in context and localStorage)
        resetCart(); // Custom function to reset cart in context
        localStorage.removeItem('cart'); // Optionally clear localStorage

        // Reset form fields
        setAddress({ street: '', city: '', zip: '' });
        setPhone('');
        setEmail('');
        setShippingOption('standard');
        setPaymentMethod('credit');
        setOrderPlaced(true);

        // Redirect after order placement
        setTimeout(() => {
            navigate('/');  // Redirect to the home page after placing the order
        }, 3000);

        setTimeout(() => {
            setOrderPlaced(false);  // Hide the success message after 3 seconds
        }, 3000);
    };

    return (
        <div className="checkout container">
            <h1>Checkout</h1>
            {orderPlaced && <div className="alert alert-success">Order placed successfully!</div>}

            <div>
                <h2>Order Summary</h2>
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.title} x {item.quantity} - ${item.price * item.quantity}
                        </li>
                    ))}
                </ul>
                <p>Total: ${total}</p>
            </div>

            <h2>Shipping Options</h2>
            <select
                className="form-select mb-3"
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
                required
            >
                <option value="standard">Standard Shipping</option>
                <option value="express">Express Shipping</option>
            </select>

            <h2>Payment Method</h2>
            <select
                className="form-select mb-3"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
            >
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
            </select>

            <h2>Shipping Address</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Street Address"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Zip Code"
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    required
                />
            </div>

            <h2>Contact Information</h2>
            <div className="mb-3">
                <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <button className="btn btn-primary" onClick={handlePlaceOrder}>
                Place Order
            </button>
        </div>
    );
}

export default Checkout;

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage when the app starts
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    // Update cart in localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart'); // Remove if cart is empty
        }
    }, [cart]);

    // Add item to the cart
    const addToCart = (product, quantity) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
            if (existingProductIndex > -1) {
                // Update quantity of existing product
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += quantity;
                return updatedCart;
            } else {
                // Add new product to cart
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    // Remove item from the cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    // Update quantity of a product in the cart
    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            );
            return updatedCart;
        });
    };

    // Reset the cart (clear it from context and localStorage)
    const resetCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, resetCart }}>
            {children}
        </CartContext.Provider>
    );
};

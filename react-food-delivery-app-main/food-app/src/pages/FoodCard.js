import React, { useState } from 'react';
import axios from 'axios';
import './FoodCard.css'; // Assuming you'll create custom styles in this file

const FoodCard = ({ food, onDelete }) => {
  const [quantity, setQuantity] = useState(food.quantity || 1);
  const unitPrice = food.price;

  const updateQuantityInBackend = async (newQuantity) => {
    try {
      await axios.patch(`http://localhost:8000/food-items/${food.id}/`, {
        quantity: newQuantity
      });
    } catch (error) {
      console.error('Error updating quantity in backend:', error);
    }
  };

  const incrementQuantity = async () => {
    if (quantity < 30) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      await updateQuantityInBackend(newQuantity);
    }
  };

  const decrementQuantity = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await updateQuantityInBackend(newQuantity);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/food-items/${food.id}/`);
      if (onDelete) {
        onDelete(food.id); // Remove the item from the UI after successful deletion
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };

  const totalPrice = (unitPrice * quantity).toFixed(2);

  return (
    <div className="food-card">
      
      <div className="food-details">
        <h2 className="food-title">{food.name}</h2>
        <p className="food-description">{food.description}</p>
        <p className="food-price">Price: ${totalPrice}</p>
        <div className="quantity-controls">
          <button onClick={decrementQuantity} disabled={quantity <= 1}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementQuantity} disabled={quantity >= 30}>+</button>
        </div>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default FoodCard;

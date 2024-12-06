import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodCard from './FoodCard';
import './Cart.css'; // Custom CSS for layout
import Layout from '../components/Layouts/Layout';

const Cart = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    axios.get('http://localhost:8000/food-items/')
      .then(response => {
        setFoodItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the food items!', error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleString();
  };

  const handleDelete = (id) => {
    setFoodItems(prevItems => prevItems.filter(food => food.id !== id));
  };

  return (
    <Layout>
      <div className="cart-container">
        <h1>Food Menu</h1>
        <div className="date-time">
          <h5>Current Date & Time: {formatDateTime(currentTime)}</h5>
        </div>

        <div className="food-items">
          {foodItems.map((food) => (
            <div key={food.id} className="food-card-wrapper">
              <FoodCard food={food} onDelete={handleDelete} />
            </div>
          ))}
        </div>
        
        <button className="order-now-btn">
          Order Now
        </button>
      </div>
    </Layout>
  );
};

export default Cart;

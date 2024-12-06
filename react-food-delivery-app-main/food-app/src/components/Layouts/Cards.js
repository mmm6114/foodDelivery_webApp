import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import  { useState, useEffect } from "react";
import axios from "axios";

function Cards({ image, rating, title, paragraph, price, renderRatingIcons }) {
  const [user, setUser] = useState(null); // State to hold user information
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    
    if (storedUser) {
      setUser(storedUser); // Set user data if valid token and user exist
    }
  }, []);

  function getCSRFToken() {

    const name = 'csrftoken';
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;  // No CSRF token found
  }
  

  const addToCart = async () => {
    const csrfToken = getCSRFToken();

try {
  const response = await axios.post("http://localhost:8000/api/add-to-cart/", {
    name: title,
    description: paragraph,
    price: price
  }, {
    headers: {
      "X-CSRFToken": csrfToken,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  
} catch (error) {
  console.error("There was an error adding the item to the cart!", error.response);
}

  };

  return (
    <Col sm={6} lg={4} xl={3} className="mb-4">
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
          <Card.Img variant="top" src={image} />
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div className="item_rating">{renderRatingIcons(rating)}</div>
            <div className="wishlist">
              <i className="bi bi-heart"></i>
            </div>
          </div>

          <Card.Title>{title}</Card.Title>
          <Card.Text>{paragraph}</Card.Text>

          <div className="d-flex align-items-center justify-content-between">
            <div className="menu_price">
              <h5 className="mb-0">${price}</h5>
            </div>
            
            {user ? (<div className="add_to_card">
                
                  <Link to="/cart" onClick={addToCart}>
                <i className="bi bi-bag me-2"></i>
                Add To Cart
              </Link>
              </div>
              ) : (
                <div className="add_to_card">
                <Link to="/login" onClick={addToCart}>
                <i className="bi bi-bag me-2"></i>
                Add To Cart
              </Link>
              </div>
              )}
              
            
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Cards;

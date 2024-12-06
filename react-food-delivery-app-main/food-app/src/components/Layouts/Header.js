import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import "../../styles/HeaderStyle.css";
import axios from "axios";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null); // State to hold user information
  const [cartTotal, setCartTotal] = useState(0); // Directly set to 0

  useEffect(() => {
    axios.get('http://localhost:8000/food-items/')
      .then(response => {
        setCartTotal(response.data.length); // Set cart total based on the length of response
      })
      .catch(error => {
        console.error('There was an error fetching the food items!', error);
      });
  }, []);

  // Scroll Navbar
  const changeValueOnScroll = () => {
    const scrollValue = document?.documentElement?.scrollTop;
    setNav(scrollValue > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeValueOnScroll);
    return () => {
      window.removeEventListener("scroll", changeValueOnScroll);
    };
  }, []);

  // Retrieve user data from local storage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set user data if valid token and user exist
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear auth token from localStorage
    localStorage.removeItem('user'); // Clear user info
    setUser(null); // Clear user state in React
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className={`${nav ? "sticky" : ""}`}>
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" className="logo">
              <img src={Logo} alt="Logo" className="img-fluid" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/menu">Our Menu</Nav.Link>
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>

              {/* Conditionally render Login or User name and Logout */}
              {user ? (
                <>
                  <Nav.Link as={Link} to="/">{user.name}</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  <Nav.Link as={Link} to="/cart">
                    <div className="cart">
                      <i className="bi bi-bag fs-5"></i>
                      <em className="roundpoint">{cartTotal}</em>
                    </div>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/cart">
                    <div className="cart">
                      <i className="bi bi-bag fs-5"></i>
                      <em className="roundpoint">{cartTotal}</em>
                    </div>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

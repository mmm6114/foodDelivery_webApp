import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Cards from "../../components/Layouts/Cards"; // Importing the Cards component
import axios from "axios";
import Layout from "../../components/Layouts/Layout";

function Section3() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/foods/")
      .then((response) => {
        console.log(response.data); // Check the data here
        setFoods(response.data); // Setting the fetched food data
      })
      .catch((error) => {
        console.error("Error fetching the food data", error);
      });
  }, []);

  // Function to render rating stars
  const renderRatingIcons = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating > 0.5) {
        stars.push(<i key={i} className="bi bi-star-fill"></i>);
        rating--;
      } else if (rating > 0 && rating < 1) {
        stars.push(<i key={"half"} className="bi bi-star-half"></i>);
        rating--;
      } else {
        stars.push(<i key={`empty${i}`} className="bi bi-star"></i>);
      }
    }
    return stars;
  };

  // Filtered foods based on search term
  const filteredFoods = foods.filter(food =>
    food.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
    <section className="menu_section">
      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">
            <h2>OUR CRAZY MENU</h2>
            <p className="para">
            Discover our delicious menu, packed with mouthwatering flavors, from juicy burgers to fresh salads and irresistible sides! Explore now and find your new favorite dish to satisfy every craving.
            </p>
            {/* Search Input */}
            <Form.Control
              type="text"
              placeholder="Search for food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
          </Col>
        </Row>
        <Row>
          {filteredFoods.map((food, index) => (
            <Cards
              key={index}
              image={`http://localhost:8000${food.image}`} // Fetch image from backend
              rating={food.rating}
              title={food.title}
              paragraph={food.paragraph}
              price={food.price}
              renderRatingIcons={renderRatingIcons} // Pass rating function
            />
          ))}
        </Row>
      </Container>
    </section>
    </Layout>
  );
}

export default Section3;

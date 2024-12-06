import "./../styles/Blog.css"
import React from "react";
import { Container, Row, Col  } from "react-bootstrap";
import Layout from "../components/Layouts/Layout";

const Blog = () => {
  return (
    <Layout>
    <section className="hero_section">
      <Container>
        <Row className="row-blog">
          <Col lg={7} className="mb-5 mb-lg-0">
            <div className="position-relative transparent-card blog">
           
              <h2 >Discover Culinary Delights from Home!</h2>
              <p className="blog">
              At Your Food Ordering Service, we believe that enjoying delicious food should be effortless. Our platform connects you with a diverse range of restaurants, offering everything from gourmet dishes to comfort food.

Explore our extensive menu, featuring fresh ingredients and authentic flavors crafted by talented chefs. With just a few clicks, you can order your favorite meals delivered right to your door.

Whether you're craving pizza, sushi, or vegan delights, we’ve got you covered! Experience the joy of dining at home with our reliable service and tasty options. Order now and satisfy your cravings!
              </p>
              <h2 >Savor the Seasons with Our Menu!</h2>
              <p>
              At Your Food Ordering Service, we celebrate the changing seasons by bringing you fresh, seasonal dishes that delight your taste buds. Each month, our chefs curate a special menu featuring locally sourced ingredients, ensuring every bite is bursting with flavor.

From warm soups in winter to vibrant salads in summer, our offerings reflect the best of each season. Plus, we prioritize customer satisfaction, with easy ordering and quick delivery right to your doorstep.

Join us in experiencing the best of seasonal dining. Order today and treat yourself to a culinary adventure!
              </p>
              </div>
          </Col>
        </Row>
        <footer className="foo">
        <p>&copy; 2024. All rights reserved.</p>
        <p>Thanks to our team for their hard work and dedication to bringing you the best food</p>
        <p>Kunj</p>
        <p>Arush</p>
        <p>Meet</p>
        <p>Yash</p>
        <p>Hiten</p>
        </footer>
      </Container>
    </section>
    </Layout>
  );
};

export default Blog;
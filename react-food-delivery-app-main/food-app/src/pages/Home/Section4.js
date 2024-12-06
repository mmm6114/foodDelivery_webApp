import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PromotionImage from "../../assets/promotion/pro.png";

function Section4() {
  return (
    <>
      <section className="promotion_section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center mb-5 mb-lg-0">
              <img src={PromotionImage} className="img-fluid" alt="Promotion" />
            </Col>
            <Col lg={6} className="px-5">
              <h2>Nothing brings people together like a good burger</h2>
              <p>
              Our handcrafted burgers, made with fresh ingredients and bold flavors, are perfect for any gathering. Juicy patties, crisp veggies, and melted cheese come together to create a burger experience like no other.
              </p>
              <ul>
                <li>
                  <p>
                  From our savory classics to gourmet options, every bite is a celebration of quality. Whether you're dining in or ordering for delivery, we ensure your meal is made to perfection and delivered hot and fresh.
                  </p>
                </li>
                <li>
                  <p>Join us for a meal that satisfies both your cravings and your love for great company. Because when the food is this good, it's more than just a meal—it's a moment to savor.</p>
                </li>
                <li>
                  <p>
                  Gather your friends and family, and indulge in a burger feast that creates unforgettable memories!
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* BG Parallax Scroll */}
      <section className="bg_parallax_scroll"></section>
    </>
  );
}

export default Section4;

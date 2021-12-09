import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="d-flex flex-column align-items-center">
            <h1>Not Found</h1>
            <p>
              <Link to="/">Return Home</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

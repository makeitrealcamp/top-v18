import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Tweet from '../components/Tweet';

export default function Home() {
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={6}>
          <Tweet />
          <Tweet />
          <Tweet />
        </Col>
      </Row>
    </Container>
  );
}

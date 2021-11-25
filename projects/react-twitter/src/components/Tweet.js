import React from 'react';
import { Card } from 'react-bootstrap';

export default function Tweet() {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>@gmoralesc</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">1 minute ago</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">0 likes</Card.Link>
        <Card.Link href="#">0 comments</Card.Link>
      </Card.Body>
    </Card>
  );
}

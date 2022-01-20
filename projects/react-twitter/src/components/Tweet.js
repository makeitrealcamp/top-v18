import React from "react";
import { Card } from "react-bootstrap";
import { formatDistance } from "date-fns";

export default function Tweet({
  content = "",
  user = {},
  createdAt = "",
  likes = 0,
  photo = "",
}) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Img height="100" variant="top" src={photo} />
        <Card.Subtitle className="mb-2 text-muted">
          {createdAt ? formatDistance(new Date(), new Date(createdAt)) : ""}
        </Card.Subtitle>
        <Card.Text>{content}</Card.Text>
        <Card.Link href="#">{likes} likes</Card.Link>
      </Card.Body>
    </Card>
  );
}

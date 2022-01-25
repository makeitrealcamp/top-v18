import React from "react";
// import PropTypes from "prop-types";
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
    <Card className="mb-4 tweet">
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

/* Tweet.propTypes = {
  content: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  createdAt: PropTypes.instanceOf(Date),
  likes: PropTypes.number,
  photo: PropTypes.string,
};

Tweet.defaultProps = {
  content: "",
  user: {},
  createdAt: "",
  likes: 0,
  photo: "",
}; */

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function NewTweet({ onSubmit }) {
  const [displayForm, setDisplayForm] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const { content, location } = event.target.elements;
    setDisplayForm(false);
    onSubmit({
      content: content.value,
      location: location.value,
    });
  }

  return displayForm ? (
    <Form className="mb-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} name="content" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" name="location" required />
      </Form.Group>
      <Button variant="primary" type="Submit">
        Submit
      </Button>{' '}
      <Button
        variant="secondary"
        onClick={() => {
          setDisplayForm(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  ) : (
    <Button
      variant="primary"
      className="mb-4"
      onClick={() => {
        setDisplayForm(true);
      }}
    >
      New Tweet
    </Button>
  );
}

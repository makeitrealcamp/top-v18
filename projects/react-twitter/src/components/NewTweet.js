import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function NewTweet({ onSubmit }) {
  const [displayForm, setDisplayForm] = useState(false);
  const [inputs, setInputs] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const { content, location, file } = inputs;
    setDisplayForm(false);
    onSubmit({
      content,
      location,
      file
    });
  }

  const fileHandler = (event) => {
    const file = event.target.files[0];

    const fileExt = file.name.split(".").pop();
    const verifyFileExt = ['jpg', 'jpeg', 'png'].includes(fileExt.toLowerCase());
    const fileSize = file.size;

    if (!verifyFileExt || fileSize > 2000000) {
      return alert("Archivo no valido")
    }

    setInputs({...inputs, file })
    setImagePreview(URL.createObjectURL(file))
  }

  const handleInputs = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  return displayForm ? (
    <Form className="mb-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control onChange={handleInputs} as="textarea" rows={3} name="content" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control onChange={handleInputs} type="text" name="location" required />
      </Form.Group>
      <div>
        <Form.Group controlId="photo" className="mb-3">
          <Form.Label>Upload your photo</Form.Label>
          <Form.Control accept=".jpg,.jpeg,.png" onChange={fileHandler} type="file" />
        </Form.Group>
        <img alt="" height="60" src={imagePreview} />
      </div>
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

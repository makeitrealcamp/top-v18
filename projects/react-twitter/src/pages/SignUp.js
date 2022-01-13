import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { signUp } from "../api/users";
import { useDispatch } from "../store/Store";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const { username, name, lastname, email, password } = event.target.elements;

    try {
      setLoading(true);
      setError("");
      const { data } = await signUp({
        username: username.value,
        name: name.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
      });
      dispatch({
        type: "SET_USER",
        payload: {
          username: data.username,
          email: data.email,
          name: data.name,
          lastname: data.lastname,
        },
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message || error);
    }
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="py-4 px-5">
            {error && <Alert variant="warning">{error}</Alert>}
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastname" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading && <Spinner animation="border" variant="light" />}
                Sign Up
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

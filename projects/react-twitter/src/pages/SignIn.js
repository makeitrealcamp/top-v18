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

import { signIn } from "../api/users";
import { useDispatch } from "../store/Store";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    try {
      setLoading(true);
      setError("");
      const { data } = await signIn({
        username: username.value,
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
    } catch (err) {
      setLoading(false);
      setError(err.message || RangeError);
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="py-4 px-5">
            {error && <Alert variant="warning">{error}</Alert>}
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" id="username" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" id="password" />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                data-testid="submit-btn"
              >
                {loading && <Spinner animation="border" variant="light" />}
                Sign In
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

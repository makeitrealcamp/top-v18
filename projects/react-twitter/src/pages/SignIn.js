import React, { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { signIn } from '../api/users';

function SignIn({ setUser }) {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;

    try {
      setLoading(true);
      setError('');
      const { data } = await signIn({
        username: username.value,
        password: password.value,
      });
      setUser({
        username: data.username,
        email: data.email,
        name: data.name,
        lastname: data.lastname,
      });
      navigate('/');
    } catch (error) {
      setError(error.message || error);
    } finally {
      setLoading(false);
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
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (payload) =>
      dispatch({
        type: 'SET_USER',
        payload,
      }),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);

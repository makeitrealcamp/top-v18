import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserContext from '../containers/UserContext';

export default function Navigation() {
  const { user } = useContext(UserContext);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          React Twitter
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {user?.username ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  {user.username}
                </Nav.Link>
                <Nav.Link as={Link} to="/signout">
                  Sign Out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/signin">
                  Sign In
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

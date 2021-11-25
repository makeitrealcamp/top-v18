import { Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">React Twitter</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#">Sign Up</Nav.Link>
              <Nav.Link href="#">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="my-4">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>@gmoralesc</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  1 minute ago
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">0 likes</Card.Link>
                <Card.Link href="#">0 comments</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

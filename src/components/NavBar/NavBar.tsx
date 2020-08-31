import React, { FC } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


export const LandingPageNav: FC = () => {
  return <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to='/'>tmrw</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav.Item>
          <Button as={Link} variant="secondary" to="/board">
            Go to your board
          </Button>
        </Nav.Item>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export const BoardNav: FC = props => {
  return <Navbar bg="primary" variant="dark" expand="lg">
    <Navbar.Brand as={Link} to='/'>tmrw</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
      { props.children }
    </Navbar.Collapse>
  </Navbar>
}

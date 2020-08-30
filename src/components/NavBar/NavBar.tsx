import React, { FC } from "react";
import { Button, Container, Nav, Navbar, NavLink } from "react-bootstrap";


export const LandingPageNav: FC = () => {
  return <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href='/'>tmrw</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav.Item>
          <Button as={NavLink} variant="secondary" href="board">
            Go to your board
          </Button>
        </Nav.Item>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export const BoardNav: FC = props => {
  return <Navbar bg="primary" variant="dark" expand="lg">
    <Navbar.Brand href='/'>tmrw</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
      { props.children }
    </Navbar.Collapse>
  </Navbar>
}

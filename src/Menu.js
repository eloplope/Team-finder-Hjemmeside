import { LinkContainer } from 'react-router-bootstrap';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import logoteam from './billeder/teamlogo.png';

function Menu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link to="/Team-finder-Hjemmeside/">
          <img src={logoteam} className="img-fluid " alt="" width="320" height="60"></img>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <LinkContainer to="/Team-finder-Hjemmeside/"><Nav.Link>Menu</Nav.Link></LinkContainer>
            <LinkContainer to="/Team-finder-Hjemmeside/chat"><Nav.Link>Chat</Nav.Link></LinkContainer>
            <LinkContainer to="/Team-finder-Hjemmeside/favoritter"><Nav.Link>Favoritter</Nav.Link></LinkContainer>
            <LinkContainer to="/Team-finder-Hjemmeside/pagethree"><Nav.Link>Finder</Nav.Link></LinkContainer>
            <LinkContainer to="/Team-finder-Hjemmeside/profil"><Nav.Link>Profil</Nav.Link></LinkContainer>
            <LinkContainer to="/Team-finder-Hjemmeside/logud"><Nav.Link>Log ud</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
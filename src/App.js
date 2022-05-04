import logo from './logo.svg';
import logo2 from './chaat.png';
import logo3 from './controoler.png';
import logo4 from './profilimg.png';
import React from 'react';
import {
  Outlet,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import RangeSlider from "react-bootstrap/FormRange";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import './App.css';
import './styles.css';


import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="" element={<PageOne />} />
        <Route path="pageone" element={<PageOne />} />
        <Route path="pagetwo" element={<PageTwo />} />
        <Route path="pagethree" element={<PageThree />} />
        <Route path="profil" element={<Profil />} />
        <Route path="*" element={<div><h1>404!</h1><p>Ikke meget at se her :-).</p></div>}></Route>
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <Menu></Menu>
      <Container>
        <Outlet></Outlet>
      </Container>
    </>);
}

function Menu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/"><Navbar.Brand>Team-Finder</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <LinkContainer to="/pageone"><Nav.Link>Menu</Nav.Link></LinkContainer>
            <LinkContainer to="/pagetwo"><Nav.Link>Chat</Nav.Link></LinkContainer>
            <LinkContainer to="/pagethree"><Nav.Link>Find</Nav.Link></LinkContainer>
            <LinkContainer to="/profil"><Nav.Link>Profil</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}
const SliderWithInputFormControl = () => {

  const [value, setValue] = React.useState(25);

  return (
    <Form>
      <Form.Group as={Row}>
        <Col xs="9">
          <RangeSlider
            value={value}
            onChange={e => setValue(e.target.value)}
            min="12" max="70"
          />
        </Col>
        <Col xs="3">
          <Form.Control defaultValue={value} />
        </Col>
      </Form.Group>
    </Form>
  );

};

const handleClick = () => {
  console.log("lmao klik klikety klik")

};

function PageOne() {
  return (
    <>
      <h1>Vælg hvad du vil</h1>
      <div className="row">
        <div className="col">
          <Link to="/pagetwo">
            <img src={logo2} className="img-fluid img-thumbnail" />
          </Link>
        </div>
        <div className="col">
          <Link to="/pagethree">
            <img src={logo3} className="img-fluid img-thumbnail" />
          </Link>
        </div>
        <div className="col">
          <Link to="/profil">
            <img src={logo4} className="img-fluid img-thumbnail" />
          </Link>
        </div>
      </div>


    </>
  );
}

function PageTwo() {
  return (
    <h1>Chat</h1>
  );
}

function PageThree() {
  return (
    <h1>Find</h1>
  );

}

function Profil() {
  return (
    <>
      <h2>Profil</h2>
      <h2>Rediger dine oplysninger</h2>
      <div style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label className="form-label">Navn:</label>
          <input type="name" className="form-control" id="exampleFormControlInput1" placeholder=" " />
        </div>
        <div>
          <label className="form-label">Telefonnummer:</label>
        </div>
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">45+</span>
          <input type="text" className="form-control" placeholder="nummer" aria-label="phonenumber" aria-describedby="addon-wrapping" />

        </div>
        <div className="mb-3">
          <label className="form-label"><br></br>Alder:</label>
          <SliderWithInputFormControl></SliderWithInputFormControl>
        </div>

        <div className="mb-3">
          <label className="form-label">Email addresse:</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label className="form-label">Din biografi:</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Hej, mit navn er joe, jeg elsker spil." rows="3"></textarea>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="button">Gem ændringer</button>
        </div>

      </div>
    </>

  );

}



export default App;

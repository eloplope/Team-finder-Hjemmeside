import logo from './logo.svg';
import logo2 from './chaat.png';
import logo3 from './controoler.png';
import logo4 from './profilimg.png';
import maximg from './maximg.jpg';
import maxto from './maxto.jpg';
import billedtre from './billedtre.png';
import jatak from './jatak.png';
import nejtak from './nejtak.png';
import logoteam from './teamlogo.png';
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
        <Route path="" element={<Forside />} />
        <Route path="forside" element={<Forside />} />
        <Route path="chat" element={<Chat />} />
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
        <Link to="/forside">
          <img src={logoteam} className="img-fluid " alt="" width="320" height="60"></img>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <LinkContainer to="/forside"><Nav.Link>Menu</Nav.Link></LinkContainer>
            <LinkContainer to="/chat"><Nav.Link>Chat</Nav.Link></LinkContainer>
            <LinkContainer to="/pagethree"><Nav.Link>Finder</Nav.Link></LinkContainer>
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

function Forside() {
  return (
    <>
      <h1>Vælg hvad du vil</h1>
      <div className="row text-center">
        <div className="col">
          <Link to="/chat">
            <img src={logo2} className="img-fluid" style={{ width: 350 }} />
          </Link>
          <h1>Chat</h1>
        </div>
        <div className="col">
          <Link to="/pagethree">
            <img src={logo3} className="img-fluid" style={{ width: 350 }} />
          </Link>
          <h1>Finder</h1>
        </div>
        <div className="col">
          <Link to="/profil">
            <img src={logo4} className="img-fluid" style={{ width: 350 }} />
          </Link>
          <h1>Profil</h1>
        </div>
      </div>


    </>
  );
}

function Chat() {
  return (
    <>
      <h1>Chat</h1>
      <div className="row align-items-end">
        <div className="col ">
          <h1>person 1</h1>
          <h1>person 2</h1>
          <h1>person 3</h1>
          <h1>person 4</h1>
          <h1>person 5</h1>
          <h1>person 6</h1>
          <h1>person 7</h1>
          <h1>person 8</h1>
          <h1>person 9</h1>
          <h1>person 10</h1>
        </div>
        <div className="col ">
          <div className="mb-3">
            <textarea className="form-control" id="beskedfelt" placeholder="Din besked" rows="4"></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

function PageThree() {
  return (
    <>
      <h1>Finder</h1>
      <div className=" text-center">
        <img src={billedtre} className="img-fluid" style={{ width: 300 }} />
      </div>
      <div className="row text-center">
        <div className="col">
          <img src={jatak} className="img-fluid" style={{ width: 200 }} />
        </div>
        <div className="col">
          <img src={nejtak} className="img-fluid" style={{ width: 200 }} />

        </div>
      </div>
    </>
  );

}

function Profil() {
  return (
    <>
      <div className="row text-left">
        <br></br>
        <h2>Rediger dine profil oplysninger</h2>
        <div className="col">
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
        </div>
        <div className="col">
          <div className="row align-items-end">
            <div className="col ">
              <img src={maximg} className="img-fluid" style={{ width: 200 }} />
            </div>
            <div className="col ">
              <img src={maxto} className="img-fluid" style={{ width: 200 }} />
            </div>
            <div className="col ">
              <img src={billedtre} className="img-fluid" style={{ width: 200 }} />
            </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" type="button">Skift billeder</button>
          </div>
        </div>
      </div>
    </>

  );

}

function SignIn() {

  return (
    <></>
  );
}


export default App;

import logo from './logo.svg';
import logo2 from './chaat.png';
import logo3 from './controoler.png';
import logo4 from './profilimg.png';
import logoteam from './teamlogo.png';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Outlet,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import RangeSlider from "react-bootstrap/FormRange";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import SignIn from './SignIn';
import Recover from './Recover';
import { authProvider } from './firebase';
import './App.css';
import './styles.css';


import { LinkContainer } from 'react-router-bootstrap';

let AuthContext = createContext({ user: undefined, setUser: undefined });

function RequireAuth(inner) {
  const location = useLocation();

  
  let {user, setUser} = useContext(AuthContext);  
  console.log("Vi er i RequireAuth!", location.pathname, user);
  
  if (user === null && location.pathname !== '/signin') {
    return <Navigate to="/signin" replace />;
  }
  if (user !== null && location.pathname === '/signin') {
    // console.log("vi er på vej til signin og er logget ind. Videresend til dashboard.");
    return <Navigate to="/forside" replace />;
  }
  
  return inner.children;
}

function AuthProvider(inner) {

  let [user, setUser] = useState({});

  useEffect(()=>{
    authProvider.firebaseSetup(user, setUser);
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{inner.children}</AuthContext.Provider>;
}


function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="" element={<Forside />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="recover" element={<Recover />} />
        <Route path="forside" element={<Forside />} />
        <Route path="chat" element={<RequireAuth><Chat /></RequireAuth>} />
        <Route path="pagethree" element={<RequireAuth><PageThree /></RequireAuth>} />
        <Route path="profil" element={<RequireAuth><Profil /></RequireAuth>} />
        <Route path="*" element={<div><h1>404!</h1><p>Ikke meget at se her :-).</p></div>}></Route>
      </Route>
    </Routes>
    </AuthProvider>
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

//<img src={logoteam} className="img-fluid " alt="" width="250" height="40"></img>
function Menu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/"><Navbar.Brand>Team-Finder</Navbar.Brand></LinkContainer>
        

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <LinkContainer to="/forside"><Nav.Link>Menu</Nav.Link></LinkContainer>
            <LinkContainer to="/chat"><Nav.Link>Chat</Nav.Link></LinkContainer>
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

function Forside() {
  return (
    <>
      <h1>Vælg hvad du vil</h1>
      <div className="row">
        <div className="col">
          <Link to="/chat">
            <img src={logo2} className="img-fluid" style={{ width: 350 }} />
          </Link>
        </div>
        <div className="col">
          <Link to="/pagethree">
            <img src={logo3} className="img-fluid" style={{ width: 350 }} />
          </Link>
        </div>
        <div className="col">
          <Link to="/profil">
            <img src={logo4} className="img-fluid" style={{ width: 350 }} />
          </Link>
        </div>
      </div>


    </>
  );
}

function Chat() {
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
      <br></br>
      <h2>Rediger dine profil oplysninger</h2>
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

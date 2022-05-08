import logo from './logo.svg';
import logo2 from './chaat.png';
import logo3 from './controoler.png';
import logo4 from './profilimg.png';
import maximg from './maximg.jpg';
import maxto from './maxto.jpg';
import davidet from './davidet.jpg';
import davidto from './Davidto.jpg';
import davidtre from './Davidtre.png';
import billedtre from './billedtre.png';
import jatak from './jatak.png';
import nejtak from './nejtak.png';
import logoteam from './teamlogo.png';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Outlet,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate,
  useNavigate
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
import { authProvider, logout } from './firebase';
import Chat from './Chat';
import './App.css';
import './styles.css';
import { Context } from "./Context.js";


import { LinkContainer } from 'react-router-bootstrap';

let AuthContext = createContext({ user: undefined, setUser: undefined });



function RequireAuth(inner) {
  const location = useLocation();  

  let { user, setUser } = useContext(AuthContext);
  //console.log("Vi er i RequireAuth!", location.pathname, user);

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
  const [context, setContext] = useState(null);

  useEffect(() => {
    authProvider.firebaseSetup(user, setUser);
  }, []);


  return <Context.Provider value={[context, setContext]}>
    <AuthContext.Provider value={{ user, setUser }}>
      {inner.children}
    </AuthContext.Provider>
  </Context.Provider>;
}


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="" element={<Forside />} />
          <Route path="signin" element={<RequireAuth><SignIn /></RequireAuth>} />
          <Route path="recover" element={<Recover />} />
          <Route path="forside" element={<Forside />} />
          <Route path="logud" element={<Logud />} />
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
            <LinkContainer to="/logud"><Nav.Link>Log ud</Nav.Link></LinkContainer>
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

function Logud() {
  const [context, setContext] = useContext(Context);
  
  console.log("Er vi her?");
  let navigate = useNavigate();


  const callback = () => {
    navigate("/forside");
  };

  

  useEffect(() => {
    console.log("Vi logger permanent ud...");
    //context(); // vi unsubscriber til snapshot Listener for at fejlbesked fra firebase.
    //logout(callback);
  }, []);

}

function PageThree() {
  return (
    <>
      <br></br>
      <div className="row text-center">
        <div className="col">
          <img src={davidto} className="img-fluid" style={{ width: 200 }} />
        </div>
        <div className="col">
          <img src={davidet} className="img-fluid" style={{ width: 250 }} />
        </div>
        <div className="col">
          <img src={davidtre} className="img-fluid" style={{ width: 200 }} />
        </div>
      </div>
      <div className='text-center'>
        <h1>David Ulrich Simonsen 18</h1>
      </div>
      <div className="row text-center">
        <div className="col text-right">
          <br></br>
        </div>
        <div className="col text-right">
          <img src={jatak} className="img-fluid" style={{ width: 200 }} />
        </div>
        <div className="col text-center">
          <p>Hej mit navn er David. Jeg elsker Counter strike, og animee. Jeg er også meget glad for baguette og humus.</p>
        </div>
        <div className="col text-left">
          <img src={nejtak} className="img-fluid" style={{ width: 200 }} />
        </div>
        <div className="col text-right">
          <br></br>
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
          <br></br>
          <h2>Vælg dine yndlingsspil</h2>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
            <label class="form-check-label" for="inlineCheckbox1">League of Legends</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
            <label class="form-check-label" for="inlineCheckbox2">Counter Strike</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option2" />
            <label class="form-check-label" for="inlineCheckbox3">Valorant</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="option2" />
            <label class="form-check-label" for="inlineCheckbox4">Fortnite</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox5" value="option2" />
            <label class="form-check-label" for="inlineCheckbox5">Rocket League</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox6" value="option2" />
            <label class="form-check-label" for="inlineCheckbox6">World of Warcraft</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox7" value="option2" />
            <label class="form-check-label" for="inlineCheckbox7">Battlefield 2042</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox8" value="option2" />
            <label class="form-check-label" for="inlineCheckbox8">Call of Duty</label>
          </div>
        </div>
      </div>
    </>

  );

}


export default App;
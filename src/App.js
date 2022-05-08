
import davidet from './davidet.jpg';
import davidto from './Davidto.jpg';
import davidtre from './Davidtre.png';

import jatak from './jatak.png';
import nejtak from './nejtak.png';
import React, { useContext, useState, useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";


import SignIn from './SignIn';
import Recover from './Recover';
import Forside from './Forside';
import { authProvider } from './firebase';
import Chat from './Chat';
import Layout from './Layout';
import Logud from './Logud';
import Profil from './Profil';
import './App.css';
import './styles.css';
import { UnsubscribeContext } from "./Context.js";
import { AuthContext } from "./Context.js";


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


  return <UnsubscribeContext.Provider value={[context, setContext]}>
    <AuthContext.Provider value={{ user, setUser }}>
      {inner.children}
    </AuthContext.Provider>
  </UnsubscribeContext.Provider>;
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

function PageThree() {
  return (
    <>
      <br></br>
      <div className="row text-center">
        <div className="col">
          <img src={davidto} className="img-fluid" style={{ width: 200 }} alt="" />
        </div>
        <div className="col">
          <img src={davidet} className="img-fluid" style={{ width: 250 }} alt="" />
        </div>
        <div className="col">
          <img src={davidtre} className="img-fluid" style={{ width: 200 }} alt="" />
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
          <img src={jatak} className="img-fluid" style={{ width: 200 }} alt="" />
        </div>
        <div className="col text-center">
          <p>Hej mit navn er David. Jeg elsker Counter strike, og animee. Jeg er også meget glad for baguette og humus.</p>
        </div>
        <div className="col text-left">
          <img src={nejtak} className="img-fluid" style={{ width: 200 }} alt="" />
        </div>
        <div className="col text-right">
          <br></br>
        </div>
      </div>
    </>
  );
}

export default App;
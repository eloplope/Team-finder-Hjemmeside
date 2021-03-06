
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
import { firebaseSetup } from './firebase';
import Chat from './Chat';
import Layout from './Layout';
import Logud from './Logud';
import Profil from './Profil';
import PageThree from './PageThree';
import Favoritter from './Favoritter';
import './App.css';
import './styles.css';
import { AuthContext } from "./Context.js";


function RequireAuth(inner) {
  const location = useLocation();

  let { user, setUser } = useContext(AuthContext);
  //console.log("Vi er i RequireAuth!", location.pathname, user);

  if (user === null && location.pathname != '/Team-finder-Hjemmeside/signin') {
    return <Navigate to="/Team-finder-Hjemmeside/signin" />;
  }
  if (user !== null && location.pathname == '/Team-finder-Hjemmeside/signin') {
    // console.log("vi er på vej til signin og er logget ind. Videresend til dashboard.");
    return <Navigate to="/Team-finder-Hjemmeside/" />;
  }

  return inner.children;
}

function App() {

  let [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Opsætter firebase...");

    const unsubscribe = firebaseSetup(user, setUser);
    return unsubscribe;
    /*
    return (()=>{
      unsubscribe();
      console.log("Afsluttet brug af firebase...");
    });
    */
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/Team-finder-Hjemmeside/" element={<Layout />}>
          <Route path="" element={<Forside />} />
          <Route path="signin" element={<RequireAuth><SignIn /></RequireAuth>} />
          <Route path="recover" element={<Recover />} />
          <Route path="logud" element={<Logud />} />
          <Route path="chat" element={<RequireAuth><Chat /></RequireAuth>} />
          <Route path="favoritter" element={<RequireAuth><Favoritter /></RequireAuth>} />
          <Route path="pagethree" element={<RequireAuth><PageThree /></RequireAuth>} />
          <Route path="profil" element={<RequireAuth><Profil /></RequireAuth>} />
          <Route path="*/" element={<div><h1>404!</h1><p>Ikke meget at se her :-).</p></div>}></Route>
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;

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
import PageThree from './PageThree';
import './App.css';
import './styles.css';
import { AuthContext } from "./Context.js";


function RequireAuth(inner) {
  const location = useLocation();

  let { user, setUser } = useContext(AuthContext);
  //console.log("Vi er i RequireAuth!", location.pathname, user);

  if (user == null && location.pathname != '/signin') {
    return <Navigate to="/signin" replace />;
  }
  if (user != null && location.pathname == '/signin') {
    // console.log("vi er på vej til signin og er logget ind. Videresend til dashboard.");
    return <Navigate to="/" replace />;
  }

  return inner.children;
}

function AuthProvider(inner) {

  let [user, setUser] = useState();

  useEffect(() => {
    console.log("Opsætter firebase...");
    const unsubscribe = authProvider.firebaseSetup(user, setUser);
    return (()=>{
      unsubscribe();
      console.log("Afsluttet brug af firebase...");
    });
  }, []);


  return <AuthContext.Provider value={{ user, setUser }}>
    {inner.children}
  </AuthContext.Provider>;
}


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="" element={<Forside />} />
          <Route path="signin" element={<RequireAuth><SignIn /></RequireAuth>} />
          <Route path="recover" element={<Recover />} />
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



export default App;
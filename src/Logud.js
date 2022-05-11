import { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context.js";

import { logout } from "./firebase";

function Logud() {
    const navigate = useNavigate();
    let { user, setUser } = useContext(AuthContext);


    useEffect(() => {
        navigate('/Team-finder-Hjemmeside/');
        logout(user, setUser);
    });

}

export default Logud;
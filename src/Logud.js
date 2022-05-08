import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


import { logout } from "./firebase";

function Logud() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/forside');        
        logout();
    });

}

export default Logud;
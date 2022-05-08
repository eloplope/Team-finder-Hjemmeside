import React from 'react';
import { useNavigate } from "react-router-dom";
import { UnsubscribeContext } from "./Context.js";

function Logud() {
    const [context, setContext] = React.useContext(UnsubscribeContext);
    const navigate = useNavigate();  

    React.useEffect(() => {
        navigate('/forside');        
        //context(); // vi unsubscriber til snapshot Listener for at fejlbesked fra firebase.
        //logout(callback);
    });

}

export default Logud;
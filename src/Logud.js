import { useContext, useEffect, useNavigate } from 'react';
import { Context } from "./Context.js";

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
  
  export default Logud;

import logo2 from './billeder/chaatlilla.png';
import logo3 from './billeder/controolerlilla.png';
import logo4 from './billeder/profilimg.png';

import { Link } from "react-router-dom";

function Forside() {
  return (
    <>
      <h1>Vælg hvad du vil</h1>
      <div className="row text-center">
        <div className="col">
          <Link to="/chat">
            <img src={logo2} className="img-fluid" style={{ width: 350 }} alt="" />
          </Link>
          <h1>Chat</h1>
        </div>
        <div className="col">
          <Link to="/pagethree">
            <img src={logo3} className="img-fluid" style={{ width: 350 }} alt="" />
          </Link>
          <h1>Finder</h1>
        </div>
        <div className="col">
          <Link to="/profil">
            <img src={logo4} className="img-fluid" style={{ width: 350 }} alt="" />
          </Link>
          <h1>Profil</h1>
        </div>
      </div>


    </>
  );
}

export default Forside;

import davidet from './davidet.jpg';
import davidto from './Davidto.jpg';
import davidtre from './Davidtre.png';
import jatak from './jatak.png';
import nejtak from './nejtak.png';

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

  export default PageThree;
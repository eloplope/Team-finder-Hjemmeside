import maximg from './maximg.jpg';
import maxto from './maxto.jpg';
import billedtre from './billedtre.png';
import RangeSlider from "react-bootstrap/FormRange";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import React from 'react';

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
                            <input type="name" className="form-control" placeholder=" " />
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
                            <img src={maximg} className="img-fluid" style={{ width: 200 }} alt="" />
                        </div>
                        <div className="col ">
                            <img src={maxto} className="img-fluid" style={{ width: 200 }} alt="" />
                        </div>
                        <div className="col ">
                            <img src={billedtre} className="img-fluid" style={{ width: 200 }} alt="" />
                        </div>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary" type="button">Skift billeder</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profil;
import { AuthContext } from "./Context.js";
import { serverTimestamp } from "firebase/firestore";
import React, { useContext, useState, useEffect } from 'react';
import { createFavorite, getFavorites } from "./firebase";


function Favoritter() {
    let { user, setUser } = useContext(AuthContext);
    const [counter, setCounter] = useState(false);
    const [league, setLeague] = useState(false);
    const [battlefield, setBattlefield] = useState(false);
    const [valorant, setValorant] = useState(false);





    useEffect(() => {

        getFavorites(user.uid).then(data => {
            if (data) {
                console.log("Henter favoritter", data);
                setCounter(data.counter);
                setLeague(data.league);
                setBattlefield(data.battlefield);
                setValorant(data.valorant);
                console.log(counter);
            }
        });

    }, []);



    function handleSubmit(event) {
        event.preventDefault();
        let f = { league, counter, battlefield, valorant };
        createFavorite(f, user.uid);
        console.log("Favoritter er gemt!", f);
    }

    return (
        <>
            <h1>Favoritter</h1>
            <h2>Vælg dine yndlingsspil</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-check form-check-inline">
                    <input className="form-check-input"
                        type="checkbox" name="league" checked={league} onChange={e => setLeague(!league)} />
                    <label className="form-check-label" >League of Legends</label>
                </div>

                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox"
                        name="counter" checked={counter} onChange={e => setCounter(!counter)} />
                    <label className="form-check-label">Counter Strike</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox"
                        name="counter" checked={battlefield} onChange={e => setBattlefield(!battlefield)} />
                    <label className="form-check-label">Battlefield</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox"
                        name="counter" checked={valorant} onChange={e => setValorant(!valorant)} />
                    <label className="form-check-label">Valorant</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Gem favoritter!</button>
            </form>

        </>
    );
}

export default Favoritter;
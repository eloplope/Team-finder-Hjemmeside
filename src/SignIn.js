import SignInForm from "./SignInForm";

function twitter() {

}

function facebook() {

}

function google() {

}

function SignIn(props) {
    return (
        <div className="row min-vh-100 p-5">
            <div className="col-8 align-self-center">
                <h1>Team finder</h1>
                <p className="lead">Millions of gamers around the world
                    uses Team Finder to find friends, chat and keep in conctact.</p>
                <ul className="lead">
                    <li>Find your gamer friends</li>
                    <li>Chat with them</li>
                    <li>??</li>
                </ul>
            </div>
            <div className="col-4 align-self-center">
                <div className='d-grid' style={{}}>
                    <h4 className="p-1">Sign In</h4>
                    <div className="p-1" ><SignInForm></SignInForm></div>
                    <h4 className="p-1">Or sign in with...</h4>
                    <div className="p-1"><button onClick={facebook} className="btn btn-lg btn-outline-dark btn-block w-100"><i className="bi bi-facebook"></i> Sign in with <b>Facebook</b></button></div>
                    <div className="p-1"><button onClick={twitter} className="btn btn-lg btn-outline-dark btn-block w-100"><i className="bi bi-twitter"></i> Sign in with <b>Twitter</b></button></div>
                    <div className="p-1"><button onClick={google} className="btn btn-lg btn-outline-dark btn-block w-100"><i className="bi bi-google"></i> Sign in with <b>Google</b></button></div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
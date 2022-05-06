import { Link } from "react-router-dom";
import { signIn } from "./firebase";

function SignInForm() {

    function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let email = formData.get('email');
        let password = formData.get('password');
        signIn(email, password);
    }

    function checked() {
        return true;
    }
    function checkboxHandler() {
        return undefined;
    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
                <input type="email" className="form-control" name="email" />
                <label className="form-label">Email address</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" className="form-control" name="password" />
                <label className="form-label">Password</label>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center mb-4">
                    <Link to="/recover">Forgot password?</Link>
                </div>
            </div>
            <button type="submit" className="btn btn-lg btn-outline-dark btn-block w-100 mb-4">Sign in</button>
        </form>


    );
}

export default SignInForm;




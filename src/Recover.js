function Recover(){

    function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let email = formData.get('email');
        //recover(email);
    }


    return(
        <>
        <div className="d-flex justify-content-center mt-5">
                <div style={{ maxWidth: 350 }}>
                    <h2>Forgot your password?</h2>
                    <p className="lead mb-4">Fill in your email and we will send you a link to recover your password.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                            <input type="email" className="form-control" name="email" />
                            <label className="form-label">Email address</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-4">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Recover;
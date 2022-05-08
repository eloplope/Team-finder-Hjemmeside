import { createMessage } from "./firebase";
import { AuthContext } from "./Context.js";
import { useContext } from "react";

function NewMessage() {
    let { user, setUser } = useContext(AuthContext);

    function handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        let content = formData.get('content');
        createMessage(content, user.displayName);
        event.target.reset();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mt-4 mb-4">
                <label>Skriv besked:</label>
                <textarea className="form-control" rows={5} name="content"></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
                <i className="bi bi-save2"> </i> Send din besked
            </button>
        </form>
    );
}

export default NewMessage;
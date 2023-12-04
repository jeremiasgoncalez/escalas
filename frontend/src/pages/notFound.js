import { Navigate } from "react-router-dom";

function NotFound() {

    return (
        <>

            <div className="e404">
                <h1>#404</h1>
                <p>Oops! Acesso Negado!</p>
                <img src="https://media.tenor.com/g1st8EZmDsEAAAAC/error.gif" alt="Sad cat" />
            </div>
        </>
    );
}

export default NotFound;
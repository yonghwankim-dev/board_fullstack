import { useHistory } from "react-router-dom";

function NavComponent(props){
    const history = useHistory();
    return (
        <>
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"/></svg>
            </a>
        
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="/home" className="nav-link px-2 link-secondary">Home</a></li>
                <li><a href="/board" className="nav-link px-2 link-dark">Board</a></li>
            </ul>
        
            <div className="col-md-3 text-end">
                <button type="button" className="btn btn-outline-primary me-2" onClick={()=>{history.push("/login")}}>Login</button>
                <button type="button" className="btn btn-primary" onClick={()=>{history.push("/signUp")}}>Sign-up</button>
            </div>
            </header>
        </div>
        <div className="b-example-divider"></div>
        </>
    );
}

export default NavComponent;

import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthenticationContext from "./auth/AuthenticationContext";
import Authorized from "./auth/Authorized";
import { logout } from "./auth/handleJWT";
import Button from "./utilis/Button";

export default function Menu() {

    const { update, claims } = useContext(AuthenticationContext);

    function getUserEmail(): string {
        return claims.filter(x => x.name === 'email')[0]?.value;
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Grandpa Cooker</NavLink>
                <div className="collapse navbar-collapse"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/ingredients">
                                Ingredients
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/recipes/create">
                                Create Recipe
                            </NavLink>
                        </li>
                        {/* <Authorized
                            role="admin"
                            authorized={<>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/ingredients">
                                        Ingredients
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/recipes/create">
                                        Create Recipe
                                    </NavLink>
                                </li>
                            </>}
                        /> */}
                    </ul>
                    <div className="d-flex">
                        <Authorized
                            authorized={<>
                                <span className="nav-link">Hello, {getUserEmail()}</span>
                                <Button
                                    className="nav-link btn btn-link"
                                    onClick={() => {
                                        logout();
                                        update([]);
                                    }}
                                >Log out</Button>
                            </>}
                            notAuthorized={<>
                                <Link to="/register"
                                    className="nav-link btn btn-link">Register</Link>
                                <Link to="/login"
                                    className="nav-link btn btn-link">Login</Link>
                            </>} />
                    </div>
                </div>
            </div>
        </nav >
    )
}
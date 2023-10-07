import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Header.css'
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("email");
        navigate("/");
    }
    useEffect(() => {
        setIsLogged(localStorage.getItem("user") ? false : true);


    })
    return <Container>
        <Link className="button" style={{ float: "left" }} to={'/'}>Home</Link>
        <div style={{ float: "right" }}>
            {isLogged && <Link className="button" to={'/login'}>Login</Link>}
            {isLogged && <Link className="button" to={'/register'}>Register</Link>}
            {!isLogged && <div class="dropdown">
                <button class="dropbtn button">{user&&user.displayName}</button>
                <div class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>}
        </div>
        <div style={{ clear: "both" }}></div>
    </Container>
}

export default Header;
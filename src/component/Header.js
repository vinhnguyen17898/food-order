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
        localStorage.removeItem("user");
        setIsLogged(false);
        navigate("/");
        
    }
    useEffect(() => {
        const userLogin = localStorage.getItem("user");
        if(userLogin){
            setIsLogged(userLogin ? true : false);
            setUser(JSON.parse(userLogin));
            console.log(JSON.parse(userLogin).photoURL);
        }
    },[])
    return <Container>
        <Link className="button" style={{ float: "left" }} to={'/'}>Home</Link>
        <div style={{ float: "right", marginTop:"10px" }}>
            {!isLogged && <Link className="button" to={'/login'}>Login</Link>}
            {!isLogged && <Link className="button" to={'/register'}>Register</Link>}
            {isLogged && <><img className="avatar" src={user&&user.photoURL} /><div className="dropdown">
                <button className="dropbtn button" style={{marginTop:"0"}}>{user&&user.displayName}</button>
                <div className="dropdown-content">
                    <button onClick={logout} style={{border:"none", background:"none"}} >Logout</button>
                </div>
            </div></>}
        </div>
        <div style={{ clear: "both" }}></div>
    </Container>
}

export default Header;
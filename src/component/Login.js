import { Container, Form, Button } from "react-bootstrap";
import Header from "./Header";
import './Login.css';
import { auth, provider } from "../firebase"
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState, useRef } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import google from '../google.png'
import Footer from "./Footer";


const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [isLogged, setIsLogged] = useState(false);
    const signIn = () => {
        signInWithPopup(auth, provider).then((data) => {
            setIsLogged(true);
            navigate("/");
            localStorage.setItem("user", JSON.stringify(data.user));
        })
    }

    const signIn2 = () => {
        if (emailRef.current.value != '' && emailRef.current.value.includes("@") && passwordRef.current.value != '') {
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem("user", JSON.tringify(user));
                navigate("/");
            })
                .catch((err) => {
                    console.log(err.code);
                    console.log(err.message);
                })
        }

    }

    useEffect(() => {
        setIsLogged(localStorage.getItem("user") ? true:false);
    })
    return (
        <div>
            <Header />
            <Container style={{ alignItems: "center", paddingTop: "100px" }}>
                <h1 style={{ color: "white" }}>Login</h1>
                <Form>
                    <div>
                        <input type="text" placeholder="Email" ref={emailRef} />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" ref={passwordRef} />
                    </div>
                    <Button variant="primary" onClick={signIn2}>Login</Button>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{ backgroundColor: "white", opacity: "1", flex: "1 1 0%", height: "1px" }}></span>
                        <span style={{ color: "white" }}>OR</span>
                        <span style={{ backgroundColor: "white", opacity: "1", flex: "1 1 0%", height: "1px" }}>v</span>
                    </div>
                    <Button style={{ background: "none", border: "solid 1px white" }} variant="primary" onClick={signIn}>
                        <img src={google} style={{ height: "30px", marginRight: "10px" }} />
                        Login With Google</Button>
                </Form>
            </Container>
            <Footer />
        </div >
    )
}

export default Login;
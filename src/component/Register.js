import { Container, Form, Button } from "react-bootstrap";
import Header from "./Header";
import './Login.css'
import React, { useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from "../firebase"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const passworConfirmdRef = useRef("");

    const register = () => {
        if (emailRef.current.value != '' && emailRef.current.value.includes("@") && passwordRef.current.value != '' && passwordRef.current.value == passworConfirmdRef.current.value) {
            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    localStorage.setItem("email", user.email);
                    navigate("/");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }

    }
    return (
        <div>
            <Header />
            <Container style={{ alignItems: "center", paddingTop: "100px" }}>
                <h1 style={{ color: "white" }}>Register</h1>
                <Form>
                    <div>
                        <input type="text" placeholder="Email" ref={emailRef} />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" ref={passwordRef} />
                    </div>
                    <div>
                        <input type="password" placeholder="Confirm password" ref={passworConfirmdRef} />
                    </div>
                    <Button variant="primary" onClick={register}>Register</Button>
                </Form>
            </Container>
        </div >
    )
}

export default Register;
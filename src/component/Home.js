import { Container } from "react-bootstrap";
import Header from './Header'
import './Home.css'
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const Home = () => {
    const [step, setStep] = useState(1);
    const [catagoryMenu, setCatagoryMenu] = useState(0);
    const shoppeRef = useRef('');
    const shoppeStep2 = () => {
        setStep(2);
        setCatagoryMenu(1);

    }

    const shoppeStep3 = () => {
        setStep(3);
        fetch("https://gappapi.deliverynow.vn/api/delivery/get_from_url?url=ho-chi-minh/com-ba-ghien-nguyen-van-troi", {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'X-Custom-Header': 'header value'
                }
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(data => {
                console.log(data);
            })
    }

    return (<>
        <Header></Header>
        <Container>
            {step == 1 && <div className="menu">
                <div><Button onClick={shoppeStep2}>Shoppe Food Menu</Button></div>
                <div><Button>Custome Menu</Button></div>
            </div>}
            {step == 2 && <div className="step2">
                {catagoryMenu == 1 && <div className="shoppe">
                    <h1>Enter Link Shoppe Food</h1>
                    <div><input ref={shoppeRef} /></div>
                    <Button className="button2" onClick={shoppeStep3}>Custome Menu</Button>
                </div>}
                {catagoryMenu == 2 && <div><Button>Custome Menu</Button></div>}
            </div>}
            {/* {step == 3 && <div className="step2">
                {catagoryMenu == 1 && <div className="shoppe">
                    <div>
                        <h1>Enter Link Shoppe Food</h1>
                        <Button></Button>
                    </div>
                    <div><input ref={shoppeRef} /></div>
                    <Button className="button2" onClick={shoppeStep3}>Custome Menu</Button>
                </div>}
                {catagoryMenu == 2 && <div><Button>Custome Menu</Button></div>}
            </div>} */}
        </Container>
    </>

    )
}

export default Home;
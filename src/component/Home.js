import { Container } from "react-bootstrap";
import Header from './Header'
import './Home.css'
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from "axios";

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
        let config = {
            method: 'get',
            url: 'https://gappapi.deliverynow.vn/api/delivery/get_from_url?url=ho-chi-minh/com-ba-ghien-nguyen-van-troi',
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/x-www-form-urlencoded",
                'X-FoodyAccessToken': '',
                'X-Foody-Api-Version': '1',
                'X-Foody-App-Type': '1004',
                'X-Foody-Client-Id': '',
                'X-Foody-Client-Language': 'vi',
                'X-Foody-Client-Type': '1',
                'X-Foody-Client-Version': '3.0.0',
                'X-Sap-Ri': 'ef6c216559a26b6011140d38562609a2f46c5111f0762022',
                'X-Custom-Header': 'header value',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
                "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            credentials: 'same-origin',
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

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
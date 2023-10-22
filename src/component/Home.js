import { Container } from "react-bootstrap";
import Header from './Header'
import './Home.css'
import React, { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import vinhnguyen from '../vinhnguyen.jpg'
import { useNavigate, useParams } from "react-router-dom";
import Item from "./Item";
import { getDatabase, ref, onValue, get, child, set } from "firebase/database";
import { db } from "../firebase";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [step, setStep] = useState(1);
    const [catagoryMenu, setCatagoryMenu] = useState(0);
    const [isOrder, setIsOrder] = useState(false);
    const [shoppeUrl, setShoppeUrl] = useState('');
    const shoppeRef = useRef('');
    console.log(shoppeRef);
    const minutesRef = useRef('');
    const [menu, setMenu] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const shoppeStep2 = () => {
        const user = localStorage.getItem("user");
        if (user) {
            setStep(2);
            setCatagoryMenu(1);
            return;
        }
        navigate("/login");

    }

    const shoppeStep3 = () => {
        setShoppeUrl(shoppeRef.current.value);
        setStep(3);
        let config = {
            method: 'get',
            url: 'https://api-food-order.vercel.app/restaurantDetail?restaurantName=' + shoppeRef.current.value.replace("https://shopeefood.vn/", "")
        };

        axios.request(config)
            .then((response) => {
                if (response.data.result == 'success') {
                    var arrMenu = [];
                    for (let obj of response.data.reply.menu_infos) {
                        arrMenu.push(...obj.dishes);
                    }
                    console.log(arrMenu);
                    setMenu(arrMenu);
                }
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const step4 = () => {
        setStep(4);


    }

    const createOderHandler = () => {
        createOrder();
    }

    const dbRef = ref(db);


    const createOrder = async () => {
        var date1 = await new Date();
        var date2 = await new Date();
        console.log(shoppeRef);

        date2 = date2.setMinutes(date1.getMinutes() + parseInt(minutesRef.current.value));
        //var shoppeUrl = shoppeRef.current.value;
        set(child(dbRef, 'order/' + date1.getTime()), {
            start_date: date1.getTime(),
            end_date: date2.toString(),
            url_shoppe: shoppeRef.current.value
        });

}

useEffect(() => {
    const { orderId } = params;
    const getOrder = () => {
        get(child(dbRef, `order/` + orderId)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    if (orderId) {
        getOrder();
    }
}, [])

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
                <Button className="button2" onClick={shoppeStep3}>Gen Menu</Button>
            </div>}
            {catagoryMenu == 2 && <div><Button>Custome Menu</Button></div>}
        </div>}
        {(step == 3) && (
            <Container style={{ marginTop: "50px" }}>
                <Button className="gen" style={{ marginBottom: "50px" }} onClick={step4}>Confirm Menu</Button>
                {menu.map((item) => {
                    return (<Item key={item.id} item={item} />)
                })}

            </Container>
        )}

        {step == 4 && <Container>
            <Button className="gen" style={{ marginBottom: "50px" }} onClick={createOderHandler}>Create Menu</Button>
            <h1 style={{ color: "white" }}>Enter the expiration time(Minnutes)</h1>
            <div><input type="number" ref={minutesRef} step={15} style={{ background: "none", borderRadius: "2rem", color: "white", border: "1px solid white", textAlign: "center" }} /></div>
        </Container>}
    </Container></>
)
}

export default Home;
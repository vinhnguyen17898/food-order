import React from 'react';
import { Link } from 'react-router-dom';
import vinhnguyen from '../vinhnguyen.jpg'

const Footer = () => {
    return (
        <>
            <div style={{ backgroundColor: "white", height: "2px", width: "100%" }}></div>
            <div style={{color:"white"}}>
                Developed by: <Link className="button" to={'facebook.com/nguyenvinh17898'}>Vinh</Link>
            </div>
            <div>
                <img style={{height:"130px"}} src={vinhnguyen}/>
            </div>
        </>

    )
}

export default Footer;
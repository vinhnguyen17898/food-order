import React from "react";

const Item = (prop) => {
    const item = prop.item;
    return (<>
        <div className="clearfix" style={{ borderBottom: "1px solid white", marginBottom: "10px", paddingBottom: "10px" }}>
            <div style={{ float: "left" }}>
                <img src={item.photos[0].value} width="70" height="70" />
            </div>
            <div style={{ float: "left", color: "white", textAlign: "left", marginLeft: "10px", width: "800px" }}>
                <h2 style={{ color: "burlywood" }}>{item.name}</h2>
                <span>{item.description}</span>
            </div>
            <div style={{ float: "right", color: "white", textAlign: "right" }}>
                <div style={{ textDecoration: "line-through", fontSize: "20px", color: "#6d6f71", display: !item.hasOwnProperty('discount_price') && "none" }}>{item.price.text}</div>
                <div style={{ fontSize: "30px", fontWeight: "bold", color: "#0288d1" }}>{item.hasOwnProperty('discount_price') ? item.discount_price.text : item.price.text}</div>
            </div>
        </div>
    </>)
}

export default Item;
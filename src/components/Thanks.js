import React from "react";
import { Link } from "react-router-dom";

const Thanks = ()=> {
    return (
        <div className="ui text container"><br />
            <h1 className="ui header centered">Thank you</h1>
            <h3 className="ui header centered">We will contact you as soon as possible</h3>
            <div className="ui container center aligned">
                <Link to="/" className="ui button teal">Continue Shopping</Link>
            </div>
            
        </div>
    )
}

export default Thanks;
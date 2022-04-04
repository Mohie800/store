import React from "react";
import { Link } from "react-router-dom";

const Header = ()=> {
    return (
        <div className="">
            <div className="ui inverted teal menu ">
                <Link to="/" className="item">Browse</Link>
                <a className="item">Submit</a>
                <div className="right menu">
                    <Link to="/cart" className="item">cart</Link>
                    <Link to="/admin" className="item">Admin</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;
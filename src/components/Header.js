import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props)=> {

    return (
        <div className="">
            <div className="ui inverted teal menu ">
                <Link to="/" className="item">Home</Link>
                <div className="right menu">
                    <Link to="/cart" className="item">
                       {`cart (${props.cart.length})`}
                        <i className="ui icon cart" />
                    </Link>
                    {props.isSignedIn?<Link to="/admin/requests" className="item">View Requests</Link>:null}
                    <Link to="/admin" className="item">Admin</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        isSignedIn: state.authState.isSignedIn
    }
}

export default connect(mapStateToProps)(Header);
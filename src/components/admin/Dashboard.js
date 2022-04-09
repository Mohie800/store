import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
    if (props.isSignedIn){
        return (
            <div className="ui container"><br></br>
                <div className="ui relaxed divided list">
                    <div className="item">
                        <i className="inbox large middle aligned icon teal"></i>
                        <div className="content">
                            <Link to="/admin/requests" className="header">New Requests</Link>
                            <div className="description">View new upcoming requests</div>
                        </div>
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="item">
                        <i className="clipboard check large middle aligned icon teal"></i>
                        <div className="content">
                            <Link to="/admin/aproved" className="header">Aproved Requests</Link>
                            <div className="description">View your aproved requests which are ready to delever</div>
                        </div>
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="item">
                        <i className="product hunt large middle aligned icon teal"></i>
                        <div className="content">
                            <Link to="/" className="header">My Products</Link>
                            <div className="description">Add, edit or remove products</div>
                        </div>
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="item">
                        <i className="dolly flatbed large middle aligned icon teal"></i>
                        <div className="content">
                            <Link to="/admin/stock" className="header">My stock</Link>
                            <div className="description">How much you have in your stock</div>
                        </div>
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="item">
                        <i className="warehouse large middle aligned icon teal"></i>
                        <div className="content">
                            <Link to="/admin/archive" className="header">Archive</Link>
                            <div className="description">You can store the old requests here</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className="ui container">
                <h1>Unautherized</h1>
                <div className="ui placeholder segment">
                    <div className="ui header centered">
                        Please sign in with the correct creds
                    </div>
                    <Link to="/admin" className="ui teal button">Sign In</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.authState.isSignedIn
    }
}

export default connect(mapStateToProps)(Dashboard);
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
    if (props.isSignedIn){
        return (
            <div className="ui container"><br></br>
                <div className="ui relaxed divided list">
                    <div className="item">
                        <i class="inbox large middle aligned icon teal"></i>
                        <div className="content">
                            <Link to="/admin/requests" className="header">New Requests</Link>
                            <div className="description">View new upcoming requests</div>
                        </div>
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="item">
                        <i class="clipboard check large middle aligned icon teal"></i>
                        <div className="content">
                            <Link to="/" className="header">Aproved Requests</Link>
                            <div className="description">View your aproved requests which are ready to delever</div>
                        </div>
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="item">
                        <i class="product hunt large middle aligned icon teal"></i>
                        <div className="content">
                            <Link to="/" className="header">My Products</Link>
                            <div className="description">Add, edit or remove products</div>
                        </div>
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="item">
                        <i class="dolly flatbed large middle aligned icon teal"></i>
                        <div className="content">
                            <Link to="/" className="header">My stock</Link>
                            <div className="description">How much you have in your stock</div>
                        </div>
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="item">
                        <i class="warehouse large middle aligned icon teal"></i>
                        <div className="content">
                            <Link to="/" className="header">Archive</Link>
                            <div className="description">You can store the old requests here</div>
                        </div>
                    </div>
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
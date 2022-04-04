import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getRequest } from "../actions";

const ReqShow = (props) => {

    React.useEffect(()=> {
        if (props.isSignedIn) {
            props.getRequest(props.id())
        }
    }, [])


    const renderReqDetails = ()=> {
        return (
            <div className="ui placeholder segment">
                <h1 className="ui header">Cutomer Details:</h1>
                <div className="ui list">
                    <div className="item">
                        <i className="users icon" />
                        <div className="content">
                        {props.request.name}
                        </div>
                    </div>
                    <div className="item">
                        <i className="phone icon"/>
                        <div className="content">
                            {props.request.number}
                        </div>
                    </div>
                    <div className="item">
                        <i className="mail icon"></i>
                        <div className="content">
                        {props.request.email}
                        </div>
                    </div>
                    <div className="item">
                        <i className="marker icon"></i>
                        <div className="content">
                        {props.request.adress}
                        </div>
                    </div>
                    <div className="item">
                        <i className="dollar sign icon" />
                        {`${props.request.payment} SDG`}
                    </div>
                </div>
            </div>
        )
    }

    const mapReq = () => {
        if (props.isSignedIn) {
            return props.request.req.map(req => {
            return (
                <div className="item" key={Math.random().toString(36).substr(2, 9)}>
                    <i className="large box middle aligned icon" />
                    <div className="content">
                        <h5>{req.productName}</h5>
                        <div className="description">Amount requested: {req.amount}</div>
                    </div>
                </div>
            )
        })
        } 
    }

    const renderDelete = () => {
        if(props.isSignedIn){
            return <div className="right content">
                <Link to={`/admin/requests/delete/${props.request.id}`} className="ui button negative">Delete Request</Link>
            </div>
        }
         
    }


    return (
        <div className="container">
            {renderReqDetails()}
            <div className="ui segment">
                <h2 className="ui header">Request:</h2>
                <div className="ui relaxed divided list">
                    {mapReq()}
                </div>
            </div>
            {renderDelete()}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn : state.authState.isSignedIn,
        request : state.requests[ownProps.id()]
    }
}

export default connect(mapStateToProps, { getRequest })(ReqShow);
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAproved,deleteAproved } from "../actions";
import server from "../../api/server";
import history from "../../history";

const AprovedShow = (props) => {

    React.useEffect(()=> {
        if (props.isSignedIn) {
            props.getAproved(props.id())
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

    const moveToArcive = async () => {
        await server.post("/archive", {...props.request})
        props.deleteAproved(props.request.id)
        history.push("/admin/aproved")
    }

    const renderDelete = () => {
        if(props.isSignedIn){
            return <div className="right content">
                <Link to={`/admin/aproved/delete/${props.request.id}`} className="ui button negative labeled icon">
                    <i className="trash icon"></i>
                    Delete Request
                </Link>
                <button onClick={()=>moveToArcive()} className="ui button teal labeled icon right floated content">
                    <i className="warehouse icon"></i>
                    Move to archive
                </button>
            </div>
        }
         
    }

    const renderAll = ()=> {
        if (props.isSignedIn) {
            return (
                <div className="ui container"><br />
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
        } else {
            return (
                <div className="ui container">
                  <h1>Unautherized</h1>
                  <div className="ui placeholder segment">
                    <div className="ui header centered">
                      Please sign in with the correct creds
                    </div>
                    <Link to="/admin" className="ui teal button">
                      Sign In
                    </Link>
                  </div>
                </div>
              );
        }
    }


    return (
        <>
        {renderAll()}
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn : state.authState.isSignedIn,
        request : state.aproved[ownProps.id()]
    }
}

export default connect(mapStateToProps, { getAproved,deleteAproved })(AprovedShow);
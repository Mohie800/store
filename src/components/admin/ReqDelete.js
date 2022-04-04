import React from "react";
import { connect } from "react-redux";
import { getRequest, deleteRequest } from "../actions";
import { Link } from "react-router-dom";
import history from "../../history";
import Modal from "./Modal";


const ReqDelete = (props) => {

    React.useEffect(()=>{
        props.getRequest(props.id())
    },[])


    const content = () => {
        if(!props.request) {
            return "Are you sure you want to delete this request?"
        } else {
            return `Are you sure you want to delete the request from: ${props.request.name}?`
        }
    }

    const actions = (
        <div>
            <button onClick={()=> props.deleteRequest(props.id())} className="ui negative button">Delete</button>
            <Link to={`/admin/requests/${props.id()}`} className="ui button">Cancel</Link>
        </div>
    )

    const renderModal = ()=> {
        if (props.isSignedIn) {
            return <Modal
            title= "Delete Product"
            content={content()}
            actions={actions}
            onDismiss={()=> history.push("/")}
             />
        }
    }



    return(
        <div>{renderModal()}</div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.authState.isSignedIn,
        request: state.requests[ownProps.id()]
    }
}

export default connect(mapStateToProps, { getRequest, deleteRequest })(ReqDelete);
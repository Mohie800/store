import React from "react";
import { connect } from "react-redux";
import { getProduct, deleteProduct } from "../actions";
import { Link } from "react-router-dom";
import history from "../../history";
import Modal from "./Modal";

const DeleteProduct = (props)=> {

    React.useEffect(()=>{
        props.getProduct(props.id())
    },[])

    const content = () => {
        if(!props.product) {
            return "Are you sure you want to delete this product?"
        } else {
            return `Are you sure you want to delete the Product: ${props.product.productName}?`
        }
    }

    const actions = (
        <div>
            <button onClick={()=> props.deleteProduct(props.id())} className="ui negative button">Delete</button>
            <Link to={"/"} className="ui button">Cancel</Link>
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
    

    return (
        <div>
            {renderModal()}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.authState.isSignedIn,
        product: state.products[ownProps.id()]
    }
}

export default connect(mapStateToProps, { getProduct, deleteProduct })(DeleteProduct);
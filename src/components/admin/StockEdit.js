import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { editStock, getProduct } from "../actions";


const StockEdit = (props)=> {

    React.useEffect(()=>{
        props.getProduct(props.id())
    },[])

    const onFormSubmit = (values) => {
        props.editStock(props.id(), values)
    }
   




    const renderEditForm = ()=> {
        if (props.isSignedIn) {
            return (
                <form className="ui form" onSubmit={props.handleSubmit(onFormSubmit)}>
                    <label>Stock</label>
                    <Field name="stock" component="input" type="number"/>
                    <button className="ui button primary" >OK</button>
                </form>
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
        <div className="ui container">
           {renderEditForm()}
        </div>
    )
}

const formWraped = reduxForm({
    form: "EditProduct"
})(StockEdit);

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.authState.isSignedIn,
        product: state.products[ownProps.id()],
        initialValues: state.products[ownProps.id()]
    }
}


export default connect(mapStateToProps, { editStock, getProduct })(formWraped)


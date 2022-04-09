import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editProduct, getProduct } from "../actions";
import { UploadClient } from '@uploadcare/upload-client';

const EditProduct = (props)=> {

    React.useEffect(()=>{
        props.getProduct(props.id())
    },[])

    const [image, setImage] = React.useState(null)

    const onFormSubmit = async  (values) => {
        const client = new UploadClient({
            publicKey: 'b24e8c6aa1560babe17f'
        })
        if (image) {
            const url = await client.uploadFile(image)
            const imageUrl = `${url.cdnUrl}/-/smart_resize/440x300/-/quality/smart/`
            props.editProduct(props.id(), values, imageUrl)
        } else {
            props.editProduct(props.id(), values)
        }
        
       
        
        
    }
   

    const onImageChange = (e) => {
       
        const image = e.target.files[0]
        setImage(image)
        
    }


    const FileInput = ()=> {
        return <input type="file" onChange={(e)=>onImageChange(e)}/>
    }


    const renderEditForm = ()=> {
        if (props.isSignedIn) {
            return (
                 <form className="ui form" onSubmit={props.handleSubmit(onFormSubmit)}>
                <label>Product Name</label>
                <Field name="productName" component="input" type="text"/>
                <label>Product prise</label>
                <Field name="productPrice" component="input" type="number"/>
                <label>Upload image</label>
                <Field name="image" component={FileInput} />
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
})(EditProduct);

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.authState.isSignedIn,
        product: state.products[ownProps.id()],
        initialValues: state.products[ownProps.id()]
    }
}


export default connect(mapStateToProps, { editProduct, getProduct })(formWraped)


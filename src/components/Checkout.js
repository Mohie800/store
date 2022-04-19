import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import $ from "jquery";
import { keys } from "lodash";
import server from "../api/server";
import history from "../history";
import { clearCart } from "./actions";

const Checkout = (props) => {

    const [loading, setLoading] = React.useState("")

    const onButSubmit = ()=> {
        setLoading("loading")
    }


    //calculate requsted products
    let counter = {}

    props.cart.forEach(function(obj) {
        var key = JSON.stringify(obj)
        counter[key] = (counter[key] || 0) + 1
    }) 
    keys = $.map(counter, function(v, i){
        const parse = JSON.parse(i)
        return {...parse};
    });

    

    const requstedPrducts = keys.map(product => {
        // console.log(`amun: ${product.amount} stk: ${product.stock} lets: ${product.stock-product.amount}`)
        return {productName: product.productName, amount: product.amount}
    })


    //calculate total stock 

    const cstock = ()=> {
        props.cart.map(p => {
            const amount = p.pAmount;
            const stock = p.stock;
            const updatedStock = stock - amount
            const id = p.id
            server.patch(`/products/${id}`, {stock: updatedStock});
        })
    }

    
    //calculate total payment
    
    const sum1 = props.cart.map(pro => {
        return Number(pro.productPrice)*Number(pro.pAmount)
        })
        
        const sum = sum1.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);


    const onSubmit = async (values)=> {
        await server.post("/requests",{...values,payment:sum, req: requstedPrducts, date: new Date().toUTCString(), month: new Date().getMonth()+1, id:Math.random().toString(36).substr(2, 9)})
        server.post("/new", {name: values.name, date: new Date().toUTCString(), month: new Date().getMonth()+1})
        props.clearCart()
        cstock()
        history.push("/thanks")
    }

    const renderError = ({error, touched}) => {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    const renderInput = ({input, meta}) => {

        const className = `field ${meta.error && meta.touched ? "error" : ""}`
        return (
            <div className= {className} >
                <input {...input} autoComplete="off" />
                {renderError(meta)}
            </div>
        )
    }

    


    return (
        <div>
            <div className="ui header">
                <br/>
                <div className="ui text container grid">
                    <div className="column">
                        <form className="ui large form" onSubmit={props.handleSubmit(onSubmit)} >
                            <div className="ui  segment">
                                <div className="field">
                                    <label>Name</label>
                                    <Field name="name" type="text"  component={renderInput} />
                                    <label>Email</label>
                                    <Field type="email" name="email" component={renderInput} />
                                    <label>Phone Number</label>
                                    <Field type="number" name="number" component={renderInput} />
                                    <label>Adress</label>
                                    <Field type="text" name="adress" component={renderInput} />
                                    {`Your total payment is: ${sum} SDG`}
                                    <button onClick={()=> onButSubmit()} className={`ui fluid large teal submit button ${loading}`}>Checkout  (Pay {sum} SDG)</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Required'
    }

    if (!values.email) {
        errors.email = 'Required'
    } 

    if (!values.number) {
        errors.number = 'Required'
      } 

    if (!values.adress) {
        errors.adress = 'Required'
    }
    return errors
  }

const mapStateToProps = (state) => {
    return{
        cart: state.cart
    }
}

const formWraped = reduxForm({
    form : "AuthForm",
    validate
}) (Checkout);

export default connect(mapStateToProps, { clearCart })(formWraped);
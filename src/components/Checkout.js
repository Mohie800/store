import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import $ from "jquery";
import { keys } from "lodash";
import server from "../api/server";
import history from "../history";

const Checkout = (props) => {


    //calculate requsted products
    let counter = {}

    props.cart.forEach(function(obj) {
        var key = JSON.stringify(obj)
        counter[key] = (counter[key] || 0) + 1
    }) 
    keys = $.map(counter, function(v, i){
        const parse = JSON.parse(i)
        return {...parse, amount: v};
    });

    

    const requstedPrducts = keys.map(product => {
        return {productName: product.productName, amount: product.amount}
    })


    
    //calculate total payment
    let chash = []

    const out = props.cart.map(pro => {
        return [...chash,Number(pro.productPrice)]
    })

    const flat = out.flat(10)

    const sum = flat.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);


    const onSubmit = (values)=> {
        server.post("/requests",{...values,payment:sum, req: requstedPrducts})
        history.push("/")
    }


    return (
        <div>
            <div className="ui header">
                {`Your total payment is: ${sum} SDG`}
                <div className="ui container center aligned grid">
                    <div className="column">
                        <form className="ui large form" onSubmit={props.handleSubmit(onSubmit)} >
                            <div className="ui  segment">
                                <div className="field">
                                    <label>Name</label>
                                    <Field type="text" name="name" component="input" />
                                    <label>Email</label>
                                    <Field type="email" name="email" component="input" />
                                    <label>Phone Number</label>
                                    <Field type="number" name="number" component="input" />
                                    <label>Adress</label>
                                    <Field type="text" name="adress" component="input" />
                                    <button className="ui fluid large teal submit button">Checkout</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        cart: state.cart
    }
}

const formWraped = reduxForm({
    form : "AuthForm"
}) (Checkout);

export default connect(mapStateToProps)(formWraped);
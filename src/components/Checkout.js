import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import $ from "jquery";
import _, { keys } from "lodash";
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

        const className = ` ${meta.error && meta.touched ? "error" : ""}`
        return (
            <div className= {className} >
                <input className="rounded-lg shadow-md border-gray-400 w-full text-sm p-2.5" {...input} autoComplete="off" />
                {renderError(meta)}
            </div>
        )
    }

    //render list of requested items
    const renderCart = ()=> {
        return props.cart.map(p => {
            return (
                <li className="flex items-center justify-between py-4 m-3 ">
                    <div className="flex items-start ">
                        <img className="flex-shrink-0 object-cover w-16 h-16 rounded-lg" src={p.url} />
                        <div className="ml-4 m-3" >
                            <p className="text-sm">{p.productName}</p>
                        </div>
                    </div>
                    <div>
                    <p class="text-sm">
                      {`${p.productPrice} SDG`}
                      <small class="text-gray-500">{`x ${p.pAmount}`}</small>
                    </p>
                  </div>
                </li>
            )
        })
    }

    // calculat total products 
    const totalProducts = ()=> {
        let amounts = [];
        props.cart.map(p => {
            return amounts.push(p.pAmount)
        })
        return _.sum(amounts)
    }


    return (
        <div className="relative mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="py-12 bg-gray-50 md:py-24">
                    <div className="max-w-lg px-4 mx-auto lg:px-8">
                        <div className="mt-8">
                            <p className="text-2xl font-medium tracking-tight">{sum} SDG</p>
                            <p className="mt-1 text-sm text-gray-500">For the purchase of</p>
                        </div>
                        <div className="mt-12">
                            <div className="flow-root">
                                <ul className="-my-4 divide-y divide-gray-200">
                                    {renderCart()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-12 bg-white md:py-24">
                    <div className="max-w-lg px-4 mx-auto lg:px-8">
                        <div className="">
                            <form className="grid grid-cols-6 gap-4" onSubmit={props.handleSubmit(onSubmit)} >
                                <div className="col-span-6">
                                    <label htmlFor="name" className="block mb-1 text-sm text-gray-600">Name</label>
                                    <Field name="name" type="text"  component={renderInput} />
                                </div>
                                <div className="col-span-6" >
                                    <label className="block mb-1 text-sm text-gray-600" >Email</label>
                                    <Field type="email" name="email" component={renderInput} />
                                </div>
                                <div className="col-span-6" >
                                    <label className="block mb-1 text-sm text-gray-600" >Phone Number</label>
                                    <Field type="number" name="number" component={renderInput} />
                                </div>
                                <div className="col-span-6" >
                                    <label className="block mb-1 text-sm text-gray-600" >Adress</label>
                                <   Field type="text" name="adress" component={renderInput} />
                                </div>
                                <div className="col-span-6" >
                                <button onClick={()=> onButSubmit()} className={`ui fluid large teal submit button w-full${loading}`}>Checkout  (Pay {sum+2000} SDG)</button>
                                </div>                                
                            </form> <br/>
                            {/* add  order summary*/}
                            <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
                                <div>
                                    <h1 className="text-2xl font-semibold leading-6 text-gray-800">Order Summary</h1>
                                </div>
                                <div className="flex mt-7 flex-col items-end w-full space-y-6">
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-gray-600">Total items</p>
                                        <p className="text-lg font-semibold leading-4 text-gray-600">{totalProducts()}</p>
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-gray-600">Sub total</p>
                                        <p className="text-lg font-semibold leading-4 text-gray-600">{`${sum} SDG`}</p>
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-gray-600">Shipping charges</p>
                                        <p className="text-lg font-semibold leading-4 text-gray-600">2000 SDG</p>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full items-center mt-32">
                                    <p className="text-xl font-semibold leading-4 text-gray-800">Estimated Total </p>
                                    <p className="text-lg font-semibold leading-4 text-gray-800">{`${sum +2000} SDG`}</p>
                                </div>
                            </div>
                        </div>
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
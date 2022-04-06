import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "./actions";

const Cart = (props)=> {



    const renderPure = ()=> {
        if(props.carts.length > 0){
            return props.carts.map(product => {
                return (
                <div className="card animate__animated animate__backInUp" key={product.id}>
                    <div className="image">
                        <img src={product.url} />
                    </div>
                    <div className="content">
                        <div className="header">{product.productName}</div>
                        <div className="description">Price : {product.productPrice} SDG</div>
                    </div>
                    <div className="extra content" >
                        <div className="right floated content">
                            <button onClick={()=>props.removeFromCart(product)} className="ui teal basic button">Remove</button>
                        </div>
                        <p>Amount : {product.amount}</p>
                        
                    </div>
                </div>
            )
            })
        } 
    }

    



    return (
        <div className=" ui container"><br />
            <div className="ui link cards centered">
                {renderPure()}
            </div>
            {props.carts.length>0?
             <div style={{textAlign: "right"}} className="right floated content">
                <Link to="/checkout" className="ui teal button">checkout</Link>
            </div>:<h1>The cart is empty!</h1>
            }
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return { carts: state.cart }
}

export default connect(mapStateToProps,{ removeFromCart })(Cart)
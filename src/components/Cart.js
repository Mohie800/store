import React from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { keys } from "lodash";
import { Link } from "react-router-dom";

const Cart = (props)=> {

    let counter = {}

    props.carts.forEach(function(obj) {
        var key = JSON.stringify(obj)
        counter[key] = (counter[key] || 0) + 1
    }) 
    keys = $.map(counter, function(v, i){
        const parse = JSON.parse(i)
        return {...parse, count: v} ;
      });




    const renderPure = ()=> {
            return keys.map(product => {
                return (
                <div className="card" key={product.id}>
                    <div className="image">
                        <img src={product.url} />
                    </div>
                    <div className="content">
                        <div className="header">{product.productName}</div>
                        <div className="description">Price : {product.productPrice} SDG</div>
                    </div>
                    <div className="extra content" >
                        <p>counter : {product.count}</p>
                    </div>
                </div>
            )
            })
       
    }

    



    return (
        <div className="container">
            <div className="ui link cards">
                {renderPure()}
            </div>
            <div style={{textAlign: "right"}} className="right floated content">
                <Link to="/checkout" className="ui teal button">checkout</Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { carts: state.cart }
}

export default connect(mapStateToProps)(Cart)
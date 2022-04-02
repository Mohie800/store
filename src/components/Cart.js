import React from "react";
import { connect } from "react-redux";

const Cart = (props)=> {

    const renderCartItems = ()=> {
        return props.carts.map(cart => {
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
                    </div>
                </div>
            )
        })
    }



    return (
        <div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return { carts: state.Cart }
}

export default connect(mapStateToProps)(Cart)
import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../actions";
import { Link } from "react-router-dom";

const Stock = (props) => {


    


    React.useEffect(()=> {
        props.getProducts()
    }, [])



    const renderAdmin = (product)=> {
        if (props.isSignedIn) {
            return (
                <div className="right floated content">
                    <Link to={`/admin/stock/edit/${product.id}`} className="ui button primary">Edit</Link>
                </div>
            )
        }
    }




    const renderCards = ()=> {
        if (props.isSignedIn) {
            return props.products.map(product => {
            return (
                <div className="card animate__animated animate__backInUp animate__animated" key={product.id}>
                    <div className="image">
                        <img src={product.url} />
                    </div>
                    <div className="content">
                        <div className="header">{product.productName}</div>
                        <div className="description">Price : {product.productPrice} SDG</div>
                        <div className="description">Stock : {product.stock?product.stock:"10"}</div>
                    </div>
                    <div className="extra content" >
                        {renderAdmin(product)}
                    </div>
                </div>
            )
        })
        }
        
    }




    return (
        <div className="ui container center">
            <h2>{props.isSignedIn?"Stock": "Unautherized"}</h2>
            <div className="ui link cards centered" >
                {renderCards()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products : Object.values(state.products),
        isSignedIn : state.authState.isSignedIn,
        cart: state.cart
    }
}

export default connect(mapStateToProps, { getProducts })(Stock);
import React from "react";
import { connect } from "react-redux";
import { getProducts, addToCart } from "./actions";
import { Link } from "react-router-dom";

const ProductList = (props) => {

    


    React.useEffect(()=> {
        props.getProducts()
    }, [])


    const renderCreate = ()=> {
        if (props.isSignedIn) {
            return (
                <div style={{textAlign: "right"}}>
                    <Link to="/products/add" className="ui button primary">
                        Add Product
                    </Link>
                </div>
            )
        }
    }


    const renderAdmin = (product)=> {
        if (props.isSignedIn) {
            return (
                <div className="right floated content">
                    <Link to={`/products/edit/${product.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/products/delete/${product.id}`} className="ui button negatvie">Delete</Link>
                </div>
            )
        }
    }


    const renderCartButton = (product)=> {
        return (
            <div className="right floated content">
                <button onClick={()=>props.addToCart(product)} className="ui teal button">Add to cart</button>
            </div>
        )
    }


    const renderCards = ()=> {
        return props.products.map(product => {
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
                        {renderAdmin(product)}
                        {renderCartButton(product)}
                    </div>
                </div>
            )
        })
    }



    return (
        <div>
            <h2>Products</h2>
            <div className="ui link cards" >
                {renderCards()}
            </div>
            {renderCreate()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products : Object.values(state.products),
        isSignedIn : state.authState.isSignedIn
    }
}

export default connect(mapStateToProps, { getProducts, addToCart })(ProductList);
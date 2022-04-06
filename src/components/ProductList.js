import React from "react";
import { connect } from "react-redux";
import { getProducts, addToCart } from "./actions";
import { Link } from "react-router-dom";
import 'animate.css';

const ProductList = (props) => {

    const [amount, setAmount] = React.useState("1");

    


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
                    <Link to="/admin/requests" className="ui button teal">View Requests</Link>
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
                <button onClick={()=>props.addToCart(product, amount)} className="ui teal labeled icon button">
                    <i className="cart icon" />
                    Add to cart
                </button>
            </div>
        )
    }


    const renderCards = ()=> {
        return props.products.map(product => {
            return (
                <div className="card animate__animated animate__backInUp animate__animated" key={product.id}>
                    <div className="image">
                        <img src={product.url} />
                    </div>
                    <div className="content">
                        <div className="header">{product.productName}</div>
                        <div className="description">Price : {product.productPrice} SDG</div>
                    </div>
                    <div className="extra content" >
                        <label>Amount:</label>
                        <input onChange={(e)=>setAmount(e.target.value)} style={{"width":"50px"}} className="ui input" type="number" defaultValue="1" />
                        {renderCartButton(product)}<br/>
                        {renderAdmin(product)}
                    </div>
                </div>
            )
        })
    }



    return (
        <div className="ui container center">
            <h2>Products</h2>
            <div className="ui link cards centered" >
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
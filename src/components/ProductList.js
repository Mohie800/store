import React from "react";
import { connect } from "react-redux";
import { getProducts, addToCart, removeFromCart } from "./actions";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';

const ProductList = (props) => {

    const [amount, setAmount] = React.useState("1");

    const [open, setOpen] = React.useState(false);
    const closeModal = () => setOpen(false);
    


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


    const renderCartList = ()=> {
        return props.cart.map(cartItem => {
            return (<div className="item">
                <img src={cartItem.url} className="ui avatar image" />
                <div className="content">
                    <a className="header">{cartItem.productName}</a>
                    <div className="description">{`${cartItem.productPrice} SDG  amount: ${cartItem.amount}`}</div>
                    <div className="right floated content">
                        <button onClick={()=>props.removeFromCart(cartItem)} className="ui teal basic button">Remove</button>
                    </div>
                </div>
            </div>)
        })
    }


    const handleAddToCart = async (product)=> {
        await props.addToCart(product, amount)
        setAmount("1")
    }
    const renderCartButton = (product)=> {
        if (product.stock === "0" && !props.isSignedIn) {
            return (
                <div className="right floated content">
                    <button className="ui red basic labeled icon button">
                        <i className="cart icon" />
                        Out of Stock
                    </button>
                </div>
            )
        } else if(!props.isSignedIn) {
            return (
            <div className="right floated content">
                <button onClick={()=>handleAddToCart(product)} className="ui teal labeled icon button">
                    <i className="cart icon" />
                    Add to cart
                </button>
            </div>
        )
        }
        
    }

    const renderAmount = (product) => {
        if(product.stock === "0") {
            return null;
        } else if(!props.isSignedIn) {
            return (
                <>
                <label>Amount:</label>
                <input onChange={(e)=>setAmount(e.target.value)} style={{"width":"50px"}} className="ui input" type="number" defaultValue="1" />
                </>
            )
        }
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
                        {renderAmount(product)}
                        {renderCartButton(product)}<br/>
                        {renderAdmin(product)}
                    </div>
                </div>
            )
        })
    }


    const renderCartFloatingBtn = ()=> {
        if(props.isSignedIn || props.cart.length <1) {
            return null
           
        } else {
             return (
                <div>
                    <button onClick={() => setOpen(o => !o)} style={{right: "10px", top: "40vh",borderColor: "black", position: "fixed"}} className="circular ui sticky icon teal button">
                        {`(${props.cart.length})`}<i className=" large icon cart" />
                    </button>
                        <div className="popup-content">
                            <Popup open={open} closeOnDocumentClick onClose={closeModal} 
                                contentStyle={{backgroundColor:"whitesmoke",minWidth: "30vh"}}>
                                <div className="ui segment">
                                    <a className="close" onClick={closeModal}>
                                        &times;
                                    </a>
                                    <div className="ui large list">
                                        {renderCartList()}
                                    </div>
                                    <Link to="/cart" className="ui teal labeled icon button">
                                        <i className="icon cart" />
                                        Go to Cart
                                    </Link>
                                </div>
                            </Popup>
                        </div>
                </div>
            )
        }
    }

    return (
        <div className="ui container center">
            <h2>Products</h2>
            <div className="ui link cards centered" >
                {renderCards()}
            </div>
            {renderCreate()}
            {renderCartFloatingBtn()}
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

export default connect(mapStateToProps, { getProducts, addToCart,removeFromCart })(ProductList);
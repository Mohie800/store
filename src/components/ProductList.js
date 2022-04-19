import React from "react";
import { connect } from "react-redux";
import { getProducts, addToCart, removeFromCart } from "./actions";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
const ProductList = (props) => {

    const [Products, setProducts] = React.useState([])

    const [open, setOpen] = React.useState(false);
    const closeModal = () => setOpen(false);
    
    React.useEffect(()=> {
        props.getProducts()
    }, [])

    const {products} = props

    

    React.useEffect(()=> {
        
        setProducts(
        products.map(p => {
            return {...p , pAmount: 1}
            }))
    }, [products])


    const renderCreate = ()=> {
        if (props.isSignedIn) {
            return (
                <div style={{textAlign: "right", marginBottom: "5px"}}>
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


    const renderCartList = ()=> {
        return props.cart.map(cartItem => {
            return (<div className="item" key={cartItem.id}>
                <img src={cartItem.url} className="ui avatar image" />
                <div className="content">
                    <a className="header">{cartItem.productName}</a>
                    <div className="description">{`${cartItem.productPrice} SDG  amount: ${cartItem.pAmount}`}</div>
                    <div className=" content description">
                        <button onClick={()=>props.removeFromCart(cartItem)} className="ui teal basic button">Remove</button>
                    </div>
                </div>
            </div>)
        })
    }


    const handleAddToCart = async (product)=> {
        await props.addToCart(product)
    }
    const renderCartButton = (product)=> {
        const sto = product.stock
        if (sto <= 0 && !props.isSignedIn) {
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

    const incAmpount = (product)=> {


        setProducts( Products.map(p =>
            p.id === product.id
              ? { ...p, pAmount: p.pAmount+1 }
              : p
          ));
        
    }

    const decAmount = (product) => {
        if(product.pAmount < 2 ) {
            return
        }
        setProducts( Products.map(p =>
            p.id === product.id
              ? { ...p, pAmount: p.pAmount - 1 }
              : p
          ));
    }

    const handleChangAmuont = (e, product)=> {
        setProducts( Products.map(p =>
            p.id === product.id
              ? { ...p, pAmount: e.target.value }
              : p
          ));
    }

    const renderAmount = (product) => {
        if(product.stock <= 0) {
            return null;
        } else if(!props.isSignedIn) {
            return (
                <>
                <div style={{"width":"50px"}} className="ui right labeled input">
                    <input type="text" inputMode="numeric" onChange={(e)=> handleChangAmuont(e, product)} value={product.pAmount}/>
                    <div className="ui mini vertical buttons">
                        <button onClick={()=>incAmpount(product)} className="ui icon button" command="Up"> <i className="up chevron icon"></i>
                        </button>
                        <button onClick={()=> decAmount(product)} className="ui icon button" command="Down"> <i className="down chevron icon"></i>
                        </button>
                    </div>
                </div>
                </>
            )
        }
    }


    const renderCards = ()=> {
        return Products.map(product => {
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
                                    <i className="ui times circle teal large icon" onClick={closeModal}>
                                       
                                    </i>
                                    <div className="ui celled big list">
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
    const renderAll = ()=> {
        if (!props.products) {
            <div className="ui icon message">
                <i className="notched circle loading icon"></i>
                <div className="content">
                    <div className="header">
                    Just one second
                    </div>
                    <p>We're fetching that content for you.</p>
                </div>
            </div>
        } else {
            return (
                <>
                    {renderCreate()}
                    <div className="ui link cards centered" >
                        {renderCards()}
                    </div>
                    
                    {renderCartFloatingBtn()}
                </>
            )
        }
    }

    return (
        <div className="ui container center">
            <div className="ui container head"><br />
                <h2 className="ui teal big button">Products</h2>
            </div><br />
            {renderAll()}
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
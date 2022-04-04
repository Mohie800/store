import React from "react";
import Header from "./Header";
import CoustomRouter from "../CustomRouter";
import history from "../history";
import { Route, Routes } from "react-router-dom";
import AuthAdmin from "./admin/AuthAdmin";
import AddProduct from "./admin/AddProduct";
import ProductList from "./ProductList";
import DeleteProduct from "./admin/DeleteProduct";
import EditProduct from "./admin/EditProduct";
import Cart from "./Cart";
import Checkout from "./Checkout";
import RequestList from "./admin/RequestList";
import ReqShow from "./admin/ReqShow";
import ReqDelete from "./admin/ReqDelete";

const App = ()=> {


    const getIDForDelete = () => {
        const pathName = window.location.pathname;
        const id = pathName.substring(17)
        return id
    }


    const getIDForEdit = () => {
        const pathName = window.location.pathname;
        const id = pathName.substring(15)
        return id
    }

    const getIdforShowReq = () => {
        const pathName = window.location.pathname;
        const id = pathName.substring(16)
        return id
    }

    const getIdforDelReq = () => {
        const pathName = window.location.pathname;
        const id = pathName.substring(23)
        return id
    }


    return (
        <div>
            <CoustomRouter history={history} >
                <Header />
                <Routes >
                    <Route path="/" exact element={<ProductList />} />
                    <Route path="/admin" exact element={<AuthAdmin />} />
                    <Route path="/admin/requests" exact element={<RequestList />} />
                    <Route path="/admin/requests/:id" exact element={<ReqShow id={()=>getIdforShowReq()} />} />
                    <Route path="/admin/requests/delete/:id" exact element={<ReqDelete id={()=>getIdforDelReq()} />} />
                    <Route path="/cart" exact element={<Cart />} />
                    <Route path="/products/delete/:id" exact element={<DeleteProduct id={()=>getIDForDelete()} />} />
                    <Route path="/products/edit/:id" exact element={<EditProduct id={()=>getIDForEdit()} />} />
                    <Route path="/products/add" exact element={<AddProduct />} />
                    <Route path="/checkout" exact element={<Checkout />} />
                </Routes>
            </CoustomRouter>
        </div>
    )
}

export default App;
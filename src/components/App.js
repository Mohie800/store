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
import Thanks from "./Thanks";
import Dashboard from "./admin/Dashboard";
import Aproved from "./admin/Aproved";
import AprovedShow from "./admin/AprovedShow";
import AprovedDelete from "./admin/AprovedDelete";
import Stock from "./admin/Stock";
import StockEdit from "./admin/StockEdit";
import Archive from "./admin/Archive";
import ArcShow from "./admin/ArcShow";
import "../styles/index.css";
import "./App.css";

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

    const getIdForAprDel = () => {
        const pathName = window.location.pathname;
        const id = pathName.substring(22)
        return id
    }

    const getIdForStock = () => {
        const pathName = window.location.pathname;
        const id = pathName.substring(18)
        return id
    }


    return (
        <div className="App">
            <CoustomRouter history={history} >
                <Header />
                <Routes >
                    <Route path="/" exact element={<ProductList />} />
                    <Route path="/admin" exact element={<AuthAdmin />} />
                    <Route path="/admin/dashboard" exact element={<Dashboard />} />
                    <Route path="/admin/stock" exact element={<Stock />} />
                    <Route path="/admin/stock/edit/:id" exact element={<StockEdit id={()=>getIdForStock()} />} />
                    <Route path="/admin/archive" exact element={<Archive />} />
                    <Route path="/admin/archive/:id" exact element={<ArcShow id={()=> getIDForEdit()} />} />
                    <Route path="/admin/aproved" exact element={<Aproved />} />
                    <Route path="/admin/aproved/:id" exact element={<AprovedShow id={()=>getIDForEdit()} />} />
                    <Route path="/admin/aproved/delete/:id" exact element={<AprovedDelete id={()=>getIdForAprDel()} />} />
                    <Route path="/admin/requests" exact element={<RequestList />} />
                    <Route path="/admin/requests/:id" exact element={<ReqShow id={()=>getIdforShowReq()} />} />
                    <Route path="/admin/requests/delete/:id" exact element={<ReqDelete id={()=>getIdforDelReq()} />} />
                    <Route path="/cart" exact element={<Cart />} />
                    <Route path="/products/delete/:id" exact element={<DeleteProduct id={()=>getIDForDelete()} />} />
                    <Route path="/products/edit/:id" exact element={<EditProduct id={()=>getIDForEdit()} />} />
                    <Route path="/products/add" exact element={<AddProduct />} />
                    <Route path="/checkout" exact element={<Checkout />} />
                    <Route path="/thanks" exact element={<Thanks /> } /> 
                </Routes>
            </CoustomRouter>
        </div>
    )
}

export default App;
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


    return (
        <div>
            <CoustomRouter history={history} >
                <Header />
                <Routes >
                    <Route path="/" exact element={<ProductList />} />
                    <Route path="/admin" exact element={<AuthAdmin />} />
                    <Route path="/products/delete/:id" exact element={<DeleteProduct id={()=>getIDForDelete()} />} />
                    <Route path="/products/edit/:id" exact element={<EditProduct id={()=>getIDForEdit()} />} />
                    <Route path="/products/add" exact element={<AddProduct />} />
                </Routes>
            </CoustomRouter>
        </div>
    )
}

export default App;
import server from "../../api/server";
import history from "../../history";

export const uploadProduct = (values, url) => async dispath => {
    const response = await server.post("/products",{...values, url});

        dispath({
            type: "UPLOAD_PRODUCT",
            payload: response.data
        })
        history.push("/")
}

export const getProducts = () => async dispath => {
    const response = await server.get("/products");

        dispath({
            type: "GET_PRODUCTS",
            payload: response.data
        })
}

export const getProduct = (id) => async dispath => {
    const response = await server.get(`/products/${id}`);

        dispath({
            type: "GET_PRODUCT",
            payload: response.data
        })
}

export const editProduct = (id, formValues, url) => async dispath => {
    const responce = await server.patch(`/products/${id}`, {...formValues, url});

    dispath({
        type: "EDIT_PRODUCT",
        payload: responce.data
    })
    history.push("/")
}

export const deleteProduct = (id) => async dispath => {
    await server.delete(`/products/${id}`);

    dispath({
        type: "DELETE_PRODUCT",
        payload: id
    })
    history.push("/")
}

export const signIn = (values) => dispath => {
    dispath( {
        type : "SIGN_IN",
        payload: values
    })
    history.push("/")
}

export const addToCart = (product, amount) => {
    return {
        type: "ADD_TO_CART",
        payload: {...product, amount}
    }
}

export const removeFromCart = (product) => {
    return {
        type: "REMOVE_TO_CART",
        payload: product
    }
}

export const clearCart = ()=> {
    return {
        type: "CLEAR_CART"
    }
}

export const getRequests = () => async dispath => {
    const response = await server.get("/requests");

        dispath({
            type: "GET_REQUESTS",
            payload: response.data
        })
}

export const getRequest = (id) => async dispath => {
    const response = await server.get(`/requests/${id}`);

        dispath({
            type: "GET_REQUEST",
            payload: response.data
        })
}

export const deleteRequest = (id) => async dispath => {
    await server.delete(`/requests/${id}`);

    dispath({
        type: "DELETE_REQUEST",
        payload: id
    })
    history.push("/admin/requests")
}
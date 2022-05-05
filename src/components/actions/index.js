import server from "../../api/server";
import authServer from "../../api/authServer";
import history from "../../history";

export const uploadProduct = (values, url) => async (dispath) => {
	const response = await server.post("/products", { ...values, url });

	dispath({
		type: "UPLOAD_PRODUCT",
		payload: response.data,
	});
	history.push("/");
};

export const getProducts = () => async (dispath) => {
	const response = await server.get("/products");

	dispath({
		type: "GET_PRODUCTS",
		payload: response.data,
	});
};

export const getProduct = (id) => async (dispath) => {
	const response = await server.get(`/products/${id}`);

	dispath({
		type: "GET_PRODUCT",
		payload: response.data,
	});
};

export const editProduct = (id, formValues, url) => async (dispath) => {
	const responce = await server.patch(`/products/${id}`, {
		...formValues,
		url,
	});

	dispath({
		type: "EDIT_PRODUCT",
		payload: responce.data,
	});
	history.push("/");
};

export const editStock = (id, formValues, url) => async (dispath) => {
	const responce = await server.patch(`/products/${id}`, {
		...formValues,
		url,
	});

	dispath({
		type: "EDIT_PRODUCT",
		payload: responce.data,
	});
	history.push("/admin/stock");
};

export const deleteProduct = (id) => async (dispath) => {
	await server.delete(`/products/${id}`);

	dispath({
		type: "DELETE_PRODUCT",
		payload: id,
	});
	history.push("/");
};

export const signIn = (values) => async (dispath) => {
	const data = JSON.stringify(values);
	const response = await authServer.post("/", data);
	dispath({
		type: "SIGN_IN",
		payload: response.data,
	});
	if (response.data === "success") {
		history.push("/admin/dashboard");
	} else {
		alert("wrong creds");
	}
};

export const addToCart = (product, amount) => {
	return {
		type: "ADD_TO_CART",
		payload: { ...product, amount },
	};
};

export const removeFromCart = (product) => {
	return {
		type: "REMOVE_TO_CART",
		payload: product,
	};
};

export const clearCart = () => {
	return {
		type: "CLEAR_CART",
	};
};

export const getRequests = () => async (dispath) => {
	const response = await server.get("/requests");

	dispath({
		type: "GET_REQUESTS",
		payload: response.data,
	});
};

export const getRequest = (id) => async (dispath) => {
	const response = await server.get(`/requests/${id}`);

	dispath({
		type: "GET_REQUEST",
		payload: response.data,
	});
};

export const deleteRequest = (id) => async (dispath) => {
	await server.delete(`/requests/${id}`);

	dispath({
		type: "DELETE_REQUEST",
		payload: id,
	});
	history.push("/admin/requests");
};

export const getAproveds = () => async (dispath) => {
	const response = await server.get("/aproved");

	dispath({
		type: "GET_APROVEDS",
		payload: response.data,
	});
};

export const getAproved = (id) => async (dispath) => {
	const response = await server.get(`/aproved/${id}`);

	dispath({
		type: "GET_APROVED",
		payload: response.data,
	});
};

export const deleteAproved = (id) => async (dispath) => {
	await server.delete(`/aproved/${id}`);

	dispath({
		type: "DELETE_APROVED",
		payload: id,
	});
	history.push("/admin/aproved");
};

export const getArchives = () => async (dispath) => {
	const response = await server.get("/archive");

	dispath({
		type: "GET_ARCHIVES",
		payload: response.data,
	});
};

export const getArchive = (id) => async (dispath) => {
	const response = await server.get(`/archive/${id}`);

	dispath({
		type: "GET_ARCHIVE",
		payload: response.data,
	});
};

export const deleteArchive = (id) => async (dispath) => {
	await server.delete(`/archive/${id}`);

	dispath({
		type: "DELETE_ARCHIVE",
		payload: id,
	});
	history.push("/admin/archive");
};

export const getNew = () => async (dispath) => {
	const response = await server.get("/new");

	dispath({
		type: "GET_NEW",
		payload: response.data,
	});
};

export const getAproveCount = () => async (dispath) => {
	const response = await server.get("/aprovecount");

	dispath({
		type: "GET_APR_COUNT",
		payload: response.data,
	});
};

export const openCart = () => {
	return {
		type: "OPEN_CART",
	};
};
export const closeCart = () => {
	return {
		type: "CLOSE_CART",
	};
};

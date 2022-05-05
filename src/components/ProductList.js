import React from "react";
import { connect } from "react-redux";
import { getProducts, addToCart, removeFromCart } from "./actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import CardList from "./CartList";
import "./productList.css";
import Banner from "./Banner";
const ProductList = (props) => {
	const [Products, setProducts] = React.useState([]);

	React.useEffect(() => {
		props.getProducts();
	}, []);

	const { products } = props;

	React.useEffect(() => {
		setProducts(
			products.map((p) => {
				return { ...p, pAmount: 1 };
			})
		);
	}, [products]);

	const renderCreate = () => {
		if (props.isSignedIn) {
			return (
				<div style={{ textAlign: "right", marginBottom: "5px" }}>
					<Link to="/products/add" className="ui button primary">
						Add Product
					</Link>
				</div>
			);
		}
	};

	const renderAdmin = (product) => {
		if (props.isSignedIn) {
			return (
				<div className="right floated content">
					<Link
						to={`/products/edit/${product.id}`}
						className="ui button primary"
					>
						Edit
					</Link>
					<Link
						to={`/products/delete/${product.id}`}
						className="ui button negatvie"
					>
						Delete
					</Link>
				</div>
			);
		}
	};

	const newCartLits = () => {
		return (
			<CardList
				id="card-list"
				open={props.open}
				setOpen={props.setOpen}
				products={props.cart}
				remove={props.removeFromCart}
			/>
		);
	};

	const handleAddToCart = async (product) => {
		await props.addToCart(product);
	};
	const renderCartButton = (product) => {
		const sto = product.stock;
		if (sto <= 0 && !props.isSignedIn) {
			return (
				<div className="right floated content">
					<button className="ui red basic labeled icon button">
						<i className="cart icon" />
						Out of Stock
					</button>
				</div>
			);
		} else if (!props.isSignedIn) {
			return (
				<div className="right floated content">
					<button
						onClick={() => handleAddToCart(product)}
						className="ui teal labeled icon button"
					>
						<i className="cart icon" />
						Add to cart
					</button>
				</div>
			);
		}
	};

	const incAmpount = (product) => {
		setProducts(
			Products.map((p) =>
				p.id === product.id
					? { ...p, pAmount: Number(p.pAmount) + 1 }
					: p
			)
		);
	};

	const decAmount = (product) => {
		if (product.pAmount < 2) {
			return;
		}
		setProducts(
			Products.map((p) =>
				p.id === product.id
					? { ...p, pAmount: Number(p.pAmount) - 1 }
					: p
			)
		);
	};

	const handleChangAmuont = (e, product) => {
		setProducts(
			Products.map((p) =>
				p.id === product.id ? { ...p, pAmount: e.target.value } : p
			)
		);
	};

	const renderAmount = (product) => {
		if (product.stock <= 0) {
			return null;
		} else if (!props.isSignedIn) {
			return (
				<>
					<div
						style={{ width: "50px" }}
						className="ui right labeled input"
					>
						<input
							type="text"
							inputMode="numeric"
							onChange={(e) => handleChangAmuont(e, product)}
							value={product.pAmount}
						/>
						<div className="ui mini vertical buttons">
							<button
								onClick={() => incAmpount(product)}
								className="ui icon button"
								command="Up"
							>
								{" "}
								<i className="up chevron icon"></i>
							</button>
							<button
								onClick={() => decAmount(product)}
								className="ui icon button"
								command="Down"
							>
								{" "}
								<i className="down chevron icon"></i>
							</button>
						</div>
					</div>
				</>
			);
		}
	};

	const renderCards = () => {
		return Products.map((product) => {
			return (
				<Card
					key={product.id}
					url={product.url}
					name={product.productName}
					price={product.productPrice}
					renderAmount={renderAmount(product)}
					renderCartButton={renderCartButton(product)}
					renderAdmin={renderAdmin(product)}
				/>
			);
		});
	};
	const handleOpenCart = () => {
		props.setOpen(!props.open);
	};

	const renderCartFloatingBtn = () => {
		if (props.isSignedIn || props.cart.length < 1) {
			return null;
		} else {
			return (
				<div>
					<button
						onClick={() => handleOpenCart()}
						style={{
							left: "10px",
							top: "40vh",
							borderColor: "black",
							position: "fixed",
						}}
						className="circular ui sticky icon teal button"
					>
						{`(${props.cart.length})`}
						<i className=" large icon cart" />
					</button>
					{newCartLits()}
				</div>
			);
		}
	};

	const renderAll = () => {
		if (Products.length == 0) {
			return (
				<div className="ui icon message">
					<i className="notched circle loading icon"></i>
					<div className="content">
						<div className="header">Just one second</div>
						<p>We're fetching that content for you.</p>
					</div>
				</div>
			);
		} else {
			return (
				<>
					{renderCreate()}
					<div className="ui link cards centered">
						{renderCards()}
					</div>

					{renderCartFloatingBtn()}
				</>
			);
		}
	};

	return (
		<>
			<Banner />
			<div className="ui container center">
				<div className="ui container head">
					<br />
					<h2 className="ui teal big button">Products</h2>
				</div>
				<br />
				{renderAll()}
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		products: Object.values(state.products),
		isSignedIn: state.authState.isSignedIn,
		cart: state.cart,
	};
};

export default connect(mapStateToProps, {
	getProducts,
	addToCart,
	removeFromCart,
})(ProductList);

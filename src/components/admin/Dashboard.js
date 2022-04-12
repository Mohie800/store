import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import {Bar, Line, Pie, Doughnut} from "react-chartjs-2";
import { getProducts, getRequests, getAproveds, getArchives, getNew,getAproveCount } from "../actions";
import { apr } from "./monthData";
import {Chart} from 'chart.js/auto';




const Dashboard = (props) => {

    let productsNames = [];
    let stockArray = [];

    
    const ref = React.useRef()

    const [active, setActive] = React.useState("")

    const newRequests = props.newRequests.length;
    const archived = props.archive.length;
    const aproved = props.Aproved.length;

    const totalRequests = newRequests + archived + aproved;
    const totalProducts = props.products.length;
    

    const names = props.products.map(p => {
        return [...productsNames, p.productName].flat(10)
    });

    const stock = props.products.map(p => {
        return [...stockArray, p.stock].flat(10)
    })

    const totalStock = stock.reduce((accumulator, value) => {
        return accumulator + Number(value);
      }, 0);

    const inStock = stock.filter(s => s > 0)
    const outOfStock = stock.filter(s => s < 1)

    let counterNew = {}
    const monthes = apr(props.new)
        
    if (monthes){monthes.forEach(function(obj) {
        var key = JSON.stringify(obj)
        counterNew[key] = (counterNew[key] || 0) + 1
    })}

    let counterApr = {}
    const monthes2 = apr(props.aproveCount)
    if (monthes2){monthes2.forEach(function(obj) {
        var key = JSON.stringify(obj)
        counterApr[key] = (counterApr[key] || 0) + 1
    })}

    let counterArc = {}
    const monthes3 = apr(props.archive)
    if (monthes3){monthes3.forEach(function(obj) {
        var key = JSON.stringify(obj)
        counterArc[key] = (counterArc[key] || 0) + 1
    })}

    const supSum = props.archive.map(p => {
        return p.payment
    } )

    const sum = supSum.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

    React.useEffect(() => {
        props.getProducts()
        props.getRequests()
        props.getAproveds()
        props.getArchives()
        props.getNew()
        props.getAproveCount()
       
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (active && ref.current && !ref.current.contains(e.target)) {
            setActive("")
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [active])

      const sidebar = ()=> {
          return(
              <div ref={ref} className={`ui vertical menu sidebar left overlay ${active}`}>
                <div className="ui container"><br></br>
                    <div className="">
                        <div className="item">
                            <i className="inbox large icon teal "></i>
                            <div className="content">
                                <Link to="/admin/requests" className="header">New Requests</Link>
                                {/* <div className="description">View new upcoming requests</div> */}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="item">
                            <i className="clipboard check large middle aligned icon teal"></i>
                            <div className="content">
                                <Link to="/admin/aproved" className="header">Aproved Requests</Link>
                                {/* <div className="description">View your aproved requests which are ready to delever</div> */}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="item">
                            <i className="product hunt large middle aligned icon teal"></i>
                            <div className="content">
                                <Link to="/" className="header">My Products</Link>
                                {/* <div className="description">Add, edit or remove products</div> */}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="item">
                            <i className="dolly flatbed large middle aligned icon teal"></i>
                            <div className="content">
                                <Link to="/admin/stock" className="header">My stock</Link>
                                {/* <div className="description">How much you have in your stock</div> */}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="item">
                            <i className="warehouse large middle aligned icon teal"></i>
                            <div className="content">
                                <Link to="/admin/archive" className="header">Archive</Link>
                                {/* <div className="description">You can store the old requests here</div> */}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="item">
                            <i className="plus square large middle aligned icon teal"></i>
                            <div className="content">
                                <Link to="/products/add" className="header">Add Product</Link>
                                {/* <div className="description">You can store the old requests here</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )
      }


      const data = {
        maintainAspectRatio: true,
        responsive: true,
        labels: ["New", "Aproved", "Archived"],
        datasets: [
          {
            data: [newRequests, aproved, archived],
            backgroundColor: ["#a333c8", "#fbbd08", "#21ba45"],
            hoverBackgroundColor: ["purple", "yellow", "yellowGreen"],
          }
        ]
      };

      const stockData = {
        maintainAspectRatio: false,
        responsive: false,
        labels: ["In Stock", "Out of Stock"],
        datasets: [
          {
            data: [inStock.length, outOfStock.length],
            backgroundColor: ["#21ba45", "#db2828"],
            hoverBackgroundColor: ["yellowGreen", "red"]
          }
        ]
      };
      

      const pieOptions = {
        legend: {
          position: "right",
          legendCallback: function(chart) {
            // Return the HTML string here.
            console.log(chart);
            return [
              <ul>
                <li>z</li>
                <li>zzzz</li>
                <li>ppp</li>
                <li>adasda</li>
              </ul>
            ];
          }
        },
        elements: {
          arc: {
            borderWidth: 2
          }
        }
      };


    

      let chartInstance


      const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "New Requests",
            data: [ counterNew[1], counterNew[2], counterNew[3], counterNew[4], counterNew[5], counterNew[6]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "#a333c8"
          },
          {
            label: "Aproved requests",
            data: [ counterApr[1], counterApr[2], counterApr[3], counterApr[4], counterApr[5], counterApr[6]],
            fill: false,
            borderColor: "#fbbd08"
          },
          {
            label: "Arcived requests",
            data: [ counterArc[1], counterArc[2], counterArc[3], counterArc[4], counterArc[5], counterArc[6]],
            fill: false,
            borderColor: "#21ba45"
          }
        ]
      }

    const renderRequestsStatus = ()=> {
        return (
            <div className="ui grid">
                <div className="nine wide column col1 reqs">
                    <Line data={lineData} />
                </div>
                <div className="reqs1 six wide column col1 right floated center aligned">
                    <h1 className="ui header center aligned ">Requests Status</h1>
                    <Pie data={data} options={pieOptions} ref={input => {
                    chartInstance = input;
                    }}/>
                </div>
            </div>
        )
    }

    const barData =  {
        labels: names,
        datasets: [
            {
            label: 'Products',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: stock
            }
        ]
    }

    const renderStockStatus = ()=> {
        return (
            <div className="ui grid">
                <div className="nine wide column reqs col1">
                    <Bar data={barData} options={{
                        maintainAspectRatio : false
                        }}
                    />
                </div>
                <div className="six wide column right floated reqs1 col1">
                    <h1 className="ui header center aligned ">Stock Status</h1>
                    <Doughnut data={stockData} options={pieOptions} ref={input => {
                    chartInstance = input;
                    }}/>
                </div>
            </div>
        )
    }
    

    

    if (props.isSignedIn){
        return (
            <div ><br />
                <div onClick={()=>setActive("visible")} className=" ui teal basic button ">
                    <i className="sidebar icon"/>
                    Menu
                </div><br />
                {sidebar()} <br />
                <div className="ui container">
                    <div className="ui grid ">
                        <div className="five column centered row">
                            <div style={{backgroundColor: "green"}} className="column col center totals aligned">
                                <div className="ui mini statistic inverted">
                                    <div className="value" >{sum} SDG </div>
                                    <div className="label">Total sales</div>
                                </div>
                            </div>
                            <div style={{backgroundColor: "red"}} className="column col center aligned totals">
                                <div className="ui mini statistic inverted">
                                    <div className="value" >{totalRequests} </div>
                                    <div className="label">Total requests</div>
                                </div>
                            </div>
                            <div style={{backgroundColor: "purple"}} className="column col center aligned totals">
                                <div className="ui mini statistic inverted">
                                    <div className="value" >{totalProducts} </div>
                                    <div className="label">Total products</div>
                                </div>
                            </div>
                            <div style={{backgroundColor: "yellowGreen"}} className="column col center aligned totals">
                                <div className="ui mini statistic inverted">
                                    <div className="value" >{totalStock} </div>
                                    <div className="label">total Stock</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {renderRequestsStatus()}
                    {renderStockStatus()}
                </div>
            </div>
        )
    } else {
        return(
            <div className="ui container">
                <h1>Unautherized</h1>
                <div className="ui placeholder segment">
                    <div className="ui header centered">
                        Please sign in with the correct creds
                    </div>
                    <Link to="/admin" className="ui teal button">Sign In</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.authState.isSignedIn,
        products: Object.values(state.products),
        newRequests: Object.values(state.requests),
        Aproved: Object.values(state.aproved),
        archive: Object.values(state.archive),
        new: state.new[0],
        aproveCount: Object.values(state.aproveCount)
    }
}

export default connect(mapStateToProps, {getProducts, getRequests, getAproveds, getArchives, getNew, getAproveCount})(Dashboard);
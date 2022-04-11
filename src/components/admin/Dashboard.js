import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import {Bar, Line, Pie} from "react-chartjs-2";
import { getProducts, getRequests, getAproveds, getArchives } from "../actions";
import {Chart} from 'chart.js/auto';
import Aproved from "./Aproved";



const Dashboard = (props) => {

    let productsNames = [];
    let stockArray = [];

    
    const ref = React.useRef()

    const [active, setActive] = React.useState(false)

    const newRequests = props.newRequests.length;
    const archived = props.archive.length;
    const aproved =props.Aproved.length;

    const names = props.products.map(p => {
        return [...productsNames, p.productName].flat(10)
    });

    const stock = props.products.map(p => {
        return [...stockArray, p.stock].flat(10)
    })

    const inStock = stock.filter(s => s > 0)
    const outOfStock = stock.filter(s => s < 1)

    React.useEffect(() => {
        props.getProducts()
        props.getRequests()
        props.getAproveds()
        props.getArchives()
        
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (active && ref.current && !ref.current.contains(e.target)) {
            setActive(false)
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
              <div ref={ref} className={`ui vertical menu sidebar left overlay ${active?"visible": ""}`}>
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
                </div>
            </div>
          )
      }


      const data = {
        maintainAspectRatio: false,
        responsive: false,
        labels: ["New", "Aproved", "Archived"],
        datasets: [
          {
            data: [newRequests, aproved, archived],
            backgroundColor: ["#a333c8", "#fbbd08", "#21ba45"],
            hoverBackgroundColor: ["purple", "yellow", "yellowGreen"]
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
            borderWidth: 0
          }
        }
      };

      let chartInstance


      const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "New Requests",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "#a333c8"
          },
          {
            label: "Aproved requests",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#fbbd08"
          },
          {
            label: "Arcived requests",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#21ba45"
          }
        ]
      }

    const renderRequestsStatus = ()=> {
        return (
            <div className="ui grid">
                <div className="nine wide column col1">
                    <Line data={lineData} />
                </div>
                <div className="six wide column col1 right floated center aligned">
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
                <div className="nine wide column col1">
                    <Bar data={barData} />
                </div>
                <div className="six wide column right floated col1">
                    <h1 className="ui header center aligned ">Stock Status</h1>
                    <Pie data={stockData} options={pieOptions} ref={input => {
                    chartInstance = input;
                    }}/>
                </div>
            </div>
        )
    }

    const renderAll = ()=> {

    }
    

    if (props.isSignedIn){
        return (
            <div ><br />
                <div on onClick={()=>setActive(!active)} className=" ui teal basic button ">
                    <i className="sidebar icon"/>
                    Menu
                </div>
                {sidebar()} <br />
                <div className="ui container">
                    <div className="ui grid">
                        <div className="five column centered row ">
                            <div style={{backgroundColor: "green"}} className="column col center aligned">
                                <div className="ui statistic inverted">
                                    <div className="value" >5000 </div>
                                    <div className="label">Total sales</div>
                                </div>
                            </div>
                            <div style={{backgroundColor: "red"}} className="column col center aligned">
                                <div className="ui statistic inverted">
                                    <div className="value" >244 </div>
                                    <div className="label">Total requests</div>
                                </div>
                            </div>
                            <div style={{backgroundColor: "purple"}} className="column col center aligned">
                                <div className="ui statistic inverted">
                                    <div className="value" >27 </div>
                                    <div className="label">Total products</div>
                                </div>
                            </div>
                            <div style={{backgroundColor: "yellowGreen"}} className="column col center aligned">
                                <div className="ui statistic inverted">
                                    <div className="value" >450 </div>
                                    <div className="label">Total products</div>
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
        archive: Object.values(state.archive)
    }
}

export default connect(mapStateToProps, {getProducts, getRequests, getAproveds, getArchives})(Dashboard);
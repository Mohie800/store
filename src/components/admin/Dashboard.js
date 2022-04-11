import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import {Pie} from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js';
Chart.register(ArcElement);



const Dashboard = (props) => {
    const ref = React.useRef()

    const [active, setActive] = React.useState(false)

    React.useEffect(() => {
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
        labels: ["a", "b", "c"],
        datasets: [
          {
            data: [3, 10, 70],
            backgroundColor: ["#a333c8", "#fbbd08", "#21ba45"],
            hoverBackgroundColor: ["purple", "yellow", "yellowGreen"]
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

    const renderRequestsStatus = ()=> {
        return (
            <div className="ui grid">
                <div className="ten wide column"></div>
                <div className="six wide column col1">
                    <h1 className="ui header center aligned ">Requests Status</h1>
                    <div className="ui list centered " style={{display: "inline-block"}}><div className="ui purple label" >
                        New Requests
                    </div>
                    <div className="ui yellow label" >
                        New Requests
                    </div>
                    <div className="ui green label" >
                        New Requests
                    </div>
                    </div>
                    <Pie data={data} options={pieOptions} ref={input => {
                    chartInstance = input;
                    }}/>
                </div>
            </div>
        )
    }

    const renderStockStatus = ()=> {
        return (
            <div className="ui grid">
                <div className="ten wide column"></div>
                <div className="six wide column col1">
                    <Pie data={data} options={pieOptions} ref={input => {
                    chartInstance = input;
                    }}/>
                </div>
            </div>
        )
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
        isSignedIn: state.authState.isSignedIn
    }
}

export default connect(mapStateToProps)(Dashboard);
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAproveds } from "../actions";

const Aproved = (props) => {
  React.useEffect(() => {
    props.getAproveds();
  }, []);

  const renderCards = () => {
    if (props.isSignedIn) {
      return props.requests.map((req) => {
        return (
          <div className="item" key={req.id}>
            <i className="large paper plane middle aligned icon" />
            <div className="content">
              <Link to={`/admin/aproved/${req.id}`} className="header">
                From {req.name}
              </Link>
              <div className="dicription">
                <i className="phone icon" />
                {req.number}
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="ui container">
          <h1>Unautherized</h1>
          <div className="ui placeholder segment">
            <div className="ui header centered">
              Please sign in with the correct creds
            </div>
            <Link to="/admin" className="ui teal button">
              Sign In
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="ui container segment">
      <br />
      <div className="ui relaxed divided list">{renderCards()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.authState.isSignedIn,
    requests: Object.values(state.aproved),
  };
};

export default connect(mapStateToProps, { getAproveds })(Aproved);

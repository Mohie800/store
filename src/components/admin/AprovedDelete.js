import React from "react";
import { connect } from "react-redux";
import { getAproved, deleteAproved } from "../actions";
import { Link } from "react-router-dom";
import history from "../../history";
import Modal from "./Modal";

const AprovedDelete = (props) => {
  React.useEffect(() => {
    props.getAproved(props.id());
  }, []);

  const content = () => {
    if (!props.request) {
      return "Are you sure you want to delete this request?";
    } else {
      return `Are you sure you want to delete the request from: ${props.request.name}?`;
    }
  };

  const actions = (
    <div>
      <button
        onClick={() => props.deleteAproved(props.id())}
        className="ui negative button"
      >
        Delete
      </button>
      <Link to={`/admin/aproved/${props.id()}`} className="ui button">
        Cancel
      </Link>
    </div>
  );

  const renderModal = () => {
    if (props.isSignedIn) {
      return (
        <Modal
          title="Delete Product"
          content={content()}
          actions={actions}
          onDismiss={() => history.push(`/admin/aproved/${props.id()}`)}
        />
      );
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

  return <div>{renderModal()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.authState.isSignedIn,
    request: state.aproved[ownProps.id()],
  };
};

export default connect(mapStateToProps, { getAproved, deleteAproved })(
  AprovedDelete
);

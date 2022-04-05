import React from "react";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { connect } from "react-redux";
import { signIn } from "../actions";

const AuthAdmin = (props)=> {

    const onSubmit = (values) => {
        props.signIn(values)
    }
    return(
        <div>
            <br />
            <div className="ui text container center aligned grid">
                <div className="column">
                    <form className="ui large form" onSubmit={props.handleSubmit(onSubmit)} >
                        <div className="ui  segment">
                            <div className="field">
                                <label>Admin Username</label>
                                <Field type="text" name="Username" component="input" />
                                <label>Password</label>
                                <Field type="password" name="password" component="input" />
                                <button className="ui fluid large teal submit button">Enter</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const formWraped = reduxForm({
    form : "AuthForm"
}) (AuthAdmin);

const mapStateToProps = (state) => {
    return {
        isSignedIn : state.authState
    }
}

export default connect(mapStateToProps, { signIn })(formWraped)
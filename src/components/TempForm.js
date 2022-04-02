import React from "react";
import { Field, reduxForm } from "redux-form";

class TempForm extends React.Component {

    renderError({error, touched}){
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {

        const className = `field ${meta.error && meta.touched ? "error" : ""}`
        return (
            <div className= {className} >
                <label>{label+ " : "}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (values) => {
        this.props.onSubmit(values)
    }

  render() {
    return (
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="title" component={this.renderInput} label="Enter Title" />
            <Field name="description" component={this.renderInput} label="Enter Description" />
            <Field name="key" component={this.renderInput} label="stream Key" />
            <button className="ui button primary" >OK</button>
        </form>
    )
  }
}

const validate = values => {
    const errors = {}
    if (!values.title) {
      errors.title = 'Required'
    } else if (values.title.length > 15) {
      errors.title = 'Must be 15 characters or less'
    }

    if (!values.description) {
        errors.description = 'Required'
    } 

    if (!values.key) {
        errors.key = 'Required'
      } else if (values.key.length < 15) {
        errors.key = 'Must be more than 15 characters'
      }

    return errors
  }

 export default reduxForm({
    form: "streamForm",
    validate
})(TempForm);



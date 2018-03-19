import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions  from '../../actions';
import renderField from './renderField';
import { validate } from './validate';


class Signup extends Component {
  
  handleFormSubmit = (formUser) => {
    this.props.signupUser(formUser);
  }

  renderAlert = () => {
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger"><strong>Ooops!</strong> {this.props.errorMessage}</div>
      );
    }
  }
  
  render() {
      const { handleSubmit, pristine, submitting } = this.props;
      return (
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset className="form-group">
            <Field name="email" component={renderField} type="email"  label="Email" />
          </fieldset>
          <fieldset className="form-group">
            <Field name="password" component={renderField} type="password" label="Password"/>
          </fieldset>
          <fieldset className="form-group">
            <Field name="passwordConfirm" component={renderField} type="password" label="Confirm Password" />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary" disabled={pristine || submitting} >Sign up!</button>
        </form>
    )
  }
}

function mapStateToProps (state){
  return {
    errorMessage: state.auth.error
  }
}


Signup = reduxForm({
  form: 'signup',
  validate: validate
  
})(Signup);

export default connect(mapStateToProps, actions)(Signup);

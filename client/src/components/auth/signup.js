import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component{
	renderField(field){
		let {meta:{touched, error}} = field;
		return(
			<fieldset className="form-group">
				<label>{field.label}</label>
				<input type={field.type} {...field.input} className="form-control"/>
				<div className="error">
					{touched ? error : ''}
				</div>
			</fieldset>
		)
	}
	handleFormSubmit(formProps){
		//Call action creator to sign up the user
		this.props.signupUser(formProps);
	}
	renderAlert(){
		if(this.props.errorMessage){
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			)
		}
	}
	render(){
		const {handleSubmit} = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<Field type="text" label="Email:" name="email" component={this.renderField}/>
				<Field type="password" label="Password:" name="password" component={this.renderField} />
				<Field type="password" label="Confirm Password:" name="passwordConfirm" component={this.renderField} />
				{this.renderAlert()}
				<button type="submit" className="btn btn-primary">Sign up!</button>
			</form>
		);
	}
}

function validate(formProps){
	const errors = {};

	if(!formProps.email){
		errors.email = 'Enter an email';
	}

	if(!formProps.password){
		errors.password = 'Enter a password';
	}

	if(!formProps.passwordConfirm){
		errors.passwordConfirm = 'Enter a password confirmation';
	}

	if(formProps.password !==formProps.passwordConfirm){
		errors.password = 'Passwords don\'t match';
	}

	return errors;

}

function mapStateToProps(state){
	return { errorMessage: state.auth.error };
}

const reduxFormSignup = reduxForm({
	validate,
	form: 'signup'
})(Signup);

export default connect(mapStateToProps, actions)(reduxFormSignup);
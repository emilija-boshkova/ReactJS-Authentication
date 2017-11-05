import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component{
	handleFormSubmit({email, password}){
		console.log(email,password);
		this.props.signinUser({email,password});
	}
	renderField(field){
		return(
			<fieldset className="form-group">
				<label>{field.label}</label>
				<input type={field.type} {...field.input} className="form-control"/>
			</fieldset>
		)
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
				{this.renderAlert()}
				<button type="submit" className="btn btn-primary">Sign in</button>
			</form>
		)
	}
}

function mapStateToProps(state){
	return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, actions)(reduxFormSignin);
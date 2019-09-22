import React from 'react';
import Tilt from 'react-tilt';

class Signin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPass: '',
			errorMess: ''
		}
	}
	onEmailChange = (event) =>  {
		this.setState({signInEmail: event.target.value})
	}
		onPassChange = (event) => {
		this.setState({signInPass: event.target.value})
	}

	onsSubmitSi = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPass
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.onRouteChange('home');
				this.props.loadUser(user);
				this.setState({errorMess: ''});
			}else{
				console.log('Ye nah')
			}
		}).catch((err) => {
			this.setState({errorMess: 'Please enter a valid username and password'});
		})
	}
	
  render(){
  const	{ onRouteChange } = this.props;
  	return(
	  <Tilt className=" br3 shadow-5 center" options={{ max : 6, transition: false }} style={{ height: 500, width: 500 }} >
		<main className="pa4 black-80">
		  <div className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f1 fw6 ph0 mh0 center ">Sign In</legend>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
		        onChange={this.onEmailChange} />
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
		        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onPassChange} type="password" name="password"  id="password" />
		      </div>
		    </fieldset>
		    <p className="errorMess" style={{color: 'red'}}>{this.state.errorMess}</p>
		    <div className="">
		      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onsSubmitSi}type="submit" value="Sign in" />
		    </div>
		    <div className="lh-copy mt3">
		      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
		    </div>
		  </div>
		</main>
	  </Tilt>
	)}
}

export default Signin;
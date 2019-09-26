import React from 'react';
import Tilt from 'react-tilt';

class Register extends React.Component{
  constructor(props){
		super(props);
		this.state = {
			email: '',
			pass: '',
			name: '',
			errorMess: ''
		}
	}

	onNameChange = (event) =>{
		this.setState({name: event.target.value})
	}
	onEmailChange = (event) =>{
		this.setState({email: event.target.value})
	}
		onPassChange = (event) =>{
		this.setState({pass: event.target.value})
	}
	onSubmitRe = () => {
		fetch('https://safe-scrubland-73601.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.pass,
				name: this.state.name
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user)
				this.props.onRouteChange('home');
			}else{
			 this.setState({errorMess: 'Please enter a valid name, e-mail, and password'});
			}
		}).catch((err) => {
			this.setState({errorMess: 'Error connecting to server'});
		})
		
		
	}

	render(){
		return(
	  <Tilt className=" br3 shadow-5 center" options={{ max : 6, transition: false }} style={{ height: 500, width: 500 }} >
		<main className="pa4 black-80">
		  <div className="measure ">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f1 fw6 ph0 mh0 center ">Register</legend>
		       <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="text" 
		        name="name"  
		        id="name"
		        onChange={this.onNameChange} />
		      </div>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="email" 
		        name="email-address"  
		        id="email-address"
		        onChange={this.onEmailChange} />
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		        <input 
		        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="password" 
		        name="password"  
		        id="password" 
		        onChange={this.onPassChange}/>
		      </div>
		    </fieldset>
		    <div className="">
		    <p className="errorMess" style={{color: 'red'}}>{this.state.errorMess}</p>
		      <input 
		      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
		      onClick={this.onSubmitRe}
		      type="submit" 
		      value="Register" />
		    </div>
		  </div>
		</main>
	  </Tilt>
	

		);
	}
} 

export default Register;
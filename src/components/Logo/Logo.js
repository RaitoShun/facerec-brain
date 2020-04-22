import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './brain.png';

const Logo = () => {
	return(
		<div className='ma4 mt0 center left-ns'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 5, transition:true }} style={{ height: 250, width: 250 }} >
 				<div className="Tilt-inner pa3"> <img style={{paddingTop: '50px'}} src={brain} alt='logo' width='100px' height='auto' /> </div>
			</Tilt>
		</div>
)}

export default Logo;
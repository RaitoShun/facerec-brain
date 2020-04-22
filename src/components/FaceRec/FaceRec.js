import React from 'react';
import './FaceRec.css';



const FaceRec = ({ imageURL,boks }) => {
	return(
		<div className='center ma'>
			<div className='absolute mt0 ma4'>
				<img id='inputImg' src={imageURL} alt="" width='500px' height='auto'/>
				<div className="bounding-box" style={{top: boks.topRow,right: boks.rightCol,left: boks.leftCol,bottom: boks.bottomRow}}></div>
			</div>
		</div>

)}

export default FaceRec;
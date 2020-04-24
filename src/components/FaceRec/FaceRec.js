import React from 'react';
import './FaceRec.css';



const FaceRec = ({ imageURL,boks }) => {
	return(
		<div className='center'>
			<div className='absolute'>
				<img id='inputImg' src={imageURL} alt=""style={{maxHeight: '300px', maxWidth: "100%"}}/>
				<div className="bounding-box" style={{top: boks.topRow,right: boks.rightCol,left: boks.leftCol,bottom: boks.bottomRow}}></div>
			</div>
		</div>

)}

export default FaceRec;
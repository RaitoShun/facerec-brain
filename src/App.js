import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkform from './components/ImgForm/ImgForm';
import Rank from './components/Rank/Rank';
import FaceRec from './components/FaceRec/FaceRec';
import Signin from './components/Signin/Signin';
import Particles from 'react-particles-js';
import Register from './components/Register/Register';
import './App.css';
import 'tachyons';


const particleOps = {
particles: {
  number: {
    value: 110,
    density: {
      enable: true,
      value_area: 800
      }
    }
  }
}
 const initialState = {
      input: '',
      imageURL: '',
      box: {},
      route:'signin',
      isSignedIn: false,
      user: {
        id: '',
        email:'',
        name: '',
        entries: 0,
        joined: ''
      }
 }
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    }
  

loadUser = (data) => {
  this.setState({user:{
        id: data.id,
        email:data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined
      }
    }
  )
}

calcFaceLoc = (data) => {
const clarifaiData = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputImg');
const width = Number(image.width);
const height = Number(image.height);
return{
  leftCol: clarifaiData.left_col * width,
  topRow: clarifaiData.top_row * height,
  rightCol: width - clarifaiData.right_col * width,
  bottomRow: height - (clarifaiData.bottom_row * height)
  }
}

displayBox = (box) => {
  this.setState({box: box})
}


onInputChange = (event) => {  
 this.setState({input: event.target.value});
}

onButtSubmit = () => {
  if (this.state.input !== ''){
    this.setState({imageURL: this.state.input});
     fetch('https://safe-scrubland-73601.herokuapp.com/imageURL', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
    .then(response => response.json())
    .then(response =>{ 
      if (response) {
      fetch('https://safe-scrubland-73601.herokuapp.com/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
    }
      this.displayBox(this.calcFaceLoc(response))

    })
    .catch(err => console.log(err));
  }else{
    window.alert('Please enter a valid URL')
  }
}


onRouteChange = (route) => {
  if(route === 'signout'){
    this.setState(initialState)
  }else if(route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route:route})
}
  render() {
   const { isSignedIn, imageURL, box, route } = this.state;
    return (
      <div className="App">
        <Particles params={particleOps} className="particles" />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
        ?<div>
          <div class="ma4" style={{height: 250}}>
          {
          this.state.imageURL ?
              <FaceRec boks={box} imageURL={imageURL} />
              :
              <Logo />
          }
          </div>
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkform onInputChange={this.onInputChange} onButtSubmit={this.onButtSubmit}  />
         </div>


        :(route==='signin'
          ?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        
      }
      </div>
    );
  }
}

export default App;

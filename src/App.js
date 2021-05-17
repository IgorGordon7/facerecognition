import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css'

const app = new Clarifai.App({
    apiKey: '50f1b5d5ca34450891d43b30cc677a94'
});

const particlesOptions = {

    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 500
            }
        }
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            imageUrl: '',
            boxes: []
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return clarifaiFace.map(face => {
                return {
                    leftCol: face.left_col * width,
                    topRow: face.top_row * height,
                    rightCol: width - (face.right_col * width),
                    bottomRow: height - (face.bottom_row * height),
                }
            }
        );
    };

    displayFaceBox = (boxes) => {
        this.setState({boxes: boxes})
    };

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    };

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(
            // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
            // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
            // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
            // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
            // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
            // so you would change from:
            // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            // to:
            // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
            </div>
        );
    }
}


export default App;

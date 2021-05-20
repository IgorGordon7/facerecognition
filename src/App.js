import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
            boxes: [],
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }


    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                entries: data.entries,
                joined: data.joined
            }
        })
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
        app.models
            .predict(
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
            .then(response => {
                console.log('hi', response)
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, {entries: count}))
                        })

                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
    };

    render() {
        const {isSignedIn, boxes, imageUrl, route} = this.state;
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'home'
                    ?
                    <div>
                        < Logo/>
                        < Rank name={this.state.user.name}
                               entries={this.state.user.entries}/>
                        < ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                        <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
                    </div>
                    :
                    (
                        route === 'signin'
                            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )

                }
            </div>
        );
    }
}


export default App;

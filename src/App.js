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
import {connect} from "react-redux";
import {setFaceBox, setInputField, setInputToUrl, setRoute, setSignIn, setUser, requestApi} from "./actions";


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

const mapStateToProps = (state) => {
    return {
        input: state.getUrlFromInput.input,
        imageUrl: state.inputToUrl.imageUrl,
        boxes: state.getBoxes.boxes,
        isSignedIn: state.getIfSignedIn.isSignedIn,
        route: state.changeRoute.route,
        user: state.getUser.user
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        onInputChange: (event) => dispatch(setInputField(event.target.value)),
        onGetUrlFromInput: (text) => dispatch(setInputToUrl(text)),
        displayFaceBox: (array) => dispatch(setFaceBox(array)),
        ifSignedIn: (bool) => dispatch(setSignIn(bool)),
        loadUser: (user) => dispatch(setUser(user)),
        onRouteChange: (route) => {
            if (route === 'signout') {
                dispatch(setSignIn(false))
            } else if (route === 'home') {
                dispatch(setSignIn(true))
            }
            dispatch(setRoute(route))

        },

    }
}


class App extends Component {

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




    onButtonSubmit = () => {
        this.props.onGetUrlFromInput(this.props.input)
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
                this.props.input)
            .then(response => {
                console.log('hi', response)
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.props.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.props.user, {entries: count}))
                        })

                }
                this.props.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }



    render() {
        const {onInputChange, imageUrl, boxes, route, onRouteChange, isSignedIn, user, loadUser} = this.props
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
                {route === 'home'
                    ?
                    <div>
                        < Logo/>
                        < Rank name={user.name}
                               entries={user.entries}/>
                        < ImageLinkForm onInputChange={onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                        <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
                    </div>
                    :
                    (
                        route === 'signin'
                            ? <Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
                            : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
                    )

                }
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

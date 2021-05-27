import {
    CHANGE_INPUT_FIELD,
    INPUT_TO_URL,
    GET_FACE_BOX,
    CHANGE_ROUTE,
    IS_SIGNED_IN,
    GET_USER_DATA,
    SIGN_IN_DATA_EMAIL,
    SIGN_IN_DATA_PASSWORD,
    SIGN_IN_FETCH_PENDING, SIGN_IN_FETCH_SUCCESS, SIGN_IN_FETCH_FAILED,
    REGISTER_NAME, REGISTER_EMAIL, REGISTER_PASSWORD, REGISTER_ERROR,
    REGISTER_FETCH_PENDING, REGISTER_FETCH_SUCCESS, REGISTER_FETCH_FAILED
} from './constants'

export const setInputField = (text) => {
    return {
        type: CHANGE_INPUT_FIELD,
        payload: text
    }
}

export const setInputToUrl = (text) => {
    return {
        type: INPUT_TO_URL,
        payload: text
    }
}

export const setFaceBox = (array) => {
    return {
        type: GET_FACE_BOX,
        payload: array
    }
}

export const setRoute = (text) => {
    return {
        type: CHANGE_ROUTE,
        payload: text
    }
}

export const setSignIn = (bool) => {
    return {
        type: IS_SIGNED_IN,
        payload: bool
    }
}

export const setUser = (user) => {
    return {
        type: GET_USER_DATA,
        payload: user
    }
}

export const setSignInDataEmail = (email) => {
    return {
        type: SIGN_IN_DATA_EMAIL,
        payload: email
    }
}

export const setSignInDataPassword = (password) => {
    return {
        type: SIGN_IN_DATA_PASSWORD,
        payload: password
    }
}

export const setRegisterName = (name) => {
    return {
        type: REGISTER_NAME,
        payload: name
    }
}

export const setRegisterEmail = (email) => {
    return {
        type: REGISTER_EMAIL,
        payload: email
    }
}

export const setRegisterPassword = (pass) => {
    return {
        type: REGISTER_PASSWORD,
        payload: pass
    }
}

export const setRegisterError = (error) => {
    return {
        type: REGISTER_ERROR,
        payload: error
    }
}

export const setSignInDataForSubmit = (signInEmail, signInPassword) => (dispatch) => {
    dispatch({type: SIGN_IN_FETCH_PENDING})
    fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: signInEmail,
            password: signInPassword
        })
    })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                dispatch(setUser(user))
                dispatch(setSignIn(true))
                dispatch(setRoute('home'))
            }
        })
        .then(data => {
                dispatch({type: SIGN_IN_FETCH_SUCCESS, payload: data})
            }
        )
        .catch(error => dispatch({type: SIGN_IN_FETCH_FAILED, payload: error}))
}

export const setRegisterDataForSubmit = (registerEmail, registerPass, registerName) => (dispatch) => {
    dispatch({type: REGISTER_FETCH_PENDING})
    fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: registerEmail,
            password: registerPass,
            name: registerName
        })
    })
        .then(res => {
            res.json().then(value => {
                if (value === "Unable to Register") {
                    dispatch(setRegisterError('Your email is in use'))
                } else {
                    if (value) {
                        dispatch(setRegisterError(''))
                        dispatch(setUser(value))
                        dispatch(setRoute('signin'))
                    }
                }
            })
        })
        .then(data => {
                dispatch({type: REGISTER_FETCH_SUCCESS, payload: data})
            }
        )
        .catch(error => dispatch({type: REGISTER_FETCH_FAILED, payload: error}))
}





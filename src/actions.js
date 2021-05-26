import {
    CHANGE_INPUT_FIELD,
    INPUT_TO_URL,
    GET_FACE_BOX,
    CHANGE_ROUTE,
    IS_SIGNED_IN,
    GET_USER_DATA,
    SIGN_IN_DATA_EMAIL,
    SIGN_IN_DATA_PASSWORD,
    SIGN_IN_FETCH_PENDING, SIGN_IN_FETCH_SUCCESS, SIGN_IN_FETCH_FAILED
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
export const setSignInDataForSubmit = (signInEmail, signInPassword) => (dispatch) => {
    console.log('EMAIL', signInEmail)
    console.log('PASS', signInPassword)
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







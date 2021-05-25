import {
    CHANGE_INPUT_FIELD,
    INPUT_TO_URL,
    GET_FACE_BOX,
    CHANGE_ROUTE,
    IS_SIGNED_IN,
    GET_USER_DATA,
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







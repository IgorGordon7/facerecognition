import {
    CHANGE_INPUT_FIELD,
    INPUT_TO_URL,
    GET_FACE_BOX,
    CHANGE_ROUTE,
    IS_SIGNED_IN,
    GET_USER_DATA,
    SIGN_IN_DATA_EMAIL, SIGN_IN_DATA_PASSWORD,
    SIGN_IN_FETCH_PENDING, SIGN_IN_FETCH_SUCCESS, SIGN_IN_FETCH_FAILED
} from "./constants";

const initialStateInput = {
    input: ''
}

const initialStateUrl = {
    imageUrl: ''
}

const initialStateBox = {
    boxes: []
}

const initialStateRoute = {
    route: 'signin'
}

const initialStateSignedIn = {
    isSignedIn: false
}

const initialStateUser = {
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

const initialStateSignInDataEmail = {
    signInEmail: ''
}

const initialStateSignInDataPassword = {
    signInPassword: ''
}

const initialStateSignInForSubmit = {
    isPending: false,
    data: '',
    error: ''
}


export const getUrlFromInput = (state = initialStateInput, action = {}) => {
    switch (action.type) {
        case CHANGE_INPUT_FIELD:
            return {...state, input: action.payload}
        default:
            return state
    }
}

export const inputToUrl = (state = initialStateUrl, action = {}) => {
    switch (action.type) {
        case INPUT_TO_URL:
            return {...state, imageUrl: action.payload}
        default:
            return state
    }
}

export const getBoxes = (state = initialStateBox, action = {}) => {
    switch (action.type) {
        case GET_FACE_BOX:
            return {...state, boxes: action.payload}
        default:
            return state
    }
}

export const changeRoute = (state = initialStateRoute, action = {}) => {
    switch (action.type) {
        case CHANGE_ROUTE:
            return {...state, route: action.payload}
        default:
            return state
    }
}

export const getIfSignedIn = (state = initialStateSignedIn, action = {}) => {
    switch (action.type) {
        case IS_SIGNED_IN:
            return {...state, isSignedIn: action.payload}
        default:
            return state
    }
}
export const getUser = (state = initialStateUser, action = {}) => {
    switch (action.type) {
        case GET_USER_DATA:
            return {...state, user: action.payload}
        default:
            return state
    }
}

export const getSignInDataEmail = (state = initialStateSignInDataEmail, action = {}) => {
    switch (action.type) {
        case SIGN_IN_DATA_EMAIL:
            return {...state, signInEmail: action.payload}
        default:
            return state
    }
}

export const getSignInDataPassword = (state = initialStateSignInDataPassword, action = {}) => {
    switch (action.type) {
        case SIGN_IN_DATA_PASSWORD:
            return {...state, signInPassword: action.payload}
        default:
            return state
    }
}

export const getSignInDataForSubmit = (state = initialStateSignInForSubmit, action = {}) => {
    switch (action.type) {
        case SIGN_IN_FETCH_PENDING:
            return {...state, isPending: true}
        case  SIGN_IN_FETCH_SUCCESS:
            return {...state, data: action.payload, isPending: false}
        case SIGN_IN_FETCH_FAILED:
            return {...state, error: action.payload, isPending: false}
        default:
            return state
    }
}

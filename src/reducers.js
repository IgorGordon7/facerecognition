import {
    CHANGE_INPUT_FIELD,
    API_REQUEST_PENDING,
    API_REQUEST_SUCCESS,
    API_REQUEST_FAILED,
    INPUT_TO_URL,
    GET_FACE_BOX,
    CHANGE_ROUTE,
    IS_SIGNED_IN,
    GET_USER_DATA
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



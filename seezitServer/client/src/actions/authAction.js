import axios from 'axios'

import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
  } from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post("http://localhost:8080/api/users/register", userData)
    .then((res) => history.push('/login'))
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}


// Login Uset

export const loginUser = userData => dispatch => {
    axios.post("http://localhost:8080/api/users/login", userData)
    .then(res => {
        const {token} = res.data;
        localStorage.setItem('jwtToken', token)
        setAuthToken(token);
        const decoded = jwt_decode(token)
        console.log(decoded);
        
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
} 

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}

/// add address in database

export const addAddress = (addressData, history) => dispatch => {
    axios.post("http://localhost:8080/api/users/address", addressData)
    .then((res) => {
        history.push('/dashboard')
        alert(res);
        console.log(res);
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}
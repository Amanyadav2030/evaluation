import axios from "axios"
import {AUTH_LOGIN_ERROR,AUTH_LOGIN_LOADING,AUTH_LOGIN_SUCCESS,AUTH_REGISTER_ERROR,AUTH_REGISTER_LOADING,AUTH_REGISTER_SUCCESS,GET_EVENTS_ERROR,GET_EVENTS_LOADING,GET_EVENTS_SUCCESS} from "./actionType"
 
const registerPostApi = (data) => (dispatch) => {
    // console.log(data)
    dispatch({ type: AUTH_REGISTER_LOADING })
    return axios.post(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/users`, data).then((res) => {
        return dispatch({ type: AUTH_REGISTER_SUCCESS })
    }).catch((err) => {
        return dispatch({ type: AUTH_REGISTER_ERROR, payload: err })
    })
}


const loginGetApi = (user) => async (dispatch) => {
    dispatch({ type: AUTH_LOGIN_LOADING })
    const users = await axios(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/users`)
    const isExist = users?.data.filter((el) => el.name == user.name)
    const isPassword = users?.data.filter((el) => el.password == user.password)

    if (isExist.length === 0) {
        return dispatch({ type: AUTH_LOGIN_ERROR, payload: "User does not exists" })
    }
    else if (isExist.length > 0 && isPassword.length > 0) {
        return dispatch({ type: AUTH_LOGIN_SUCCESS, payload: isExist })
    } else {
        return dispatch({ type: AUTH_LOGIN_ERROR, payload: "Incorrect Password" })
    }
}

const eventGetApi = () => (dispatch) => {
    dispatch({ type: GET_EVENTS_LOADING })
    return axios(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/meetups`).then((res) => {
        dispatch({ type: GET_EVENTS_SUCCESS, payload: res.data })
    }).catch((err) => {
        console.log(err)
        dispatch({ type: GET_EVENTS_ERROR, payload: err })
    })
}

export { registerPostApi, loginGetApi, eventGetApi }
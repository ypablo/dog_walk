import counterReducer from "./counter"
import loggedReducer from "./isLogged"
import {combineReducers} from "redux"

const allReducers = combineReducers({
    //[give any name you want]: combineReducers
    counterReducer: counterReducer,
    loggedReducer: loggedReducer
})

export default allReducers
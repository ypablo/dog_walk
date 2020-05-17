import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import {increment, decrement} from "../../actions/"

export default function Footer() {
    const counter = useSelector(state => state.counterReducer)
    const isLogged = useSelector(state => state.loggedReducer)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>Counter: {counter} </h1>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <h2>
                {isLogged ? "Information is valuable": "Information is not valuable"}</h2> 
        </div>
    )
}

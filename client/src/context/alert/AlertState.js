import React, { useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlerState = props => {
    //const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, []);

    //Show Alert
    const setAlert = (msg, type) => {
        const id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        })

        setTimeout(() => (
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        ), 3500);
    }

    return (
        <AlertContext.Provider value={{
            alerts: state,
            setAlert
        }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlerState;
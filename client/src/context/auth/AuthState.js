import React, { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),//to access browser's local storage
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dipatch] = useReducer(AuthReducer, initialState);

    //Load User 
    //Register user
    //Login user
    //Logout 
    //CLear errors



    return (
        <AuthContext.Provider value={
            {
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,

            }
        }
        >
            {props.childern}
        </AuthContext.Provider>
    );

}


export default AuthState;
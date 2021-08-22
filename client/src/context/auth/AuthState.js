import React, { useReducer } from 'react'
import axios from 'axios';
import AuthContext from './authContext'
import AuthReducer from './authReducer'

import setAuthToken from '../../utils/setAuthToken'

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

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User 

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');

            if (res.data.msg === "Authorisation denied" || res.data.msg === "Invalid Token") {
                dispatch({
                    type: AUTH_ERROR
                })
            } else {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                });
            }


        } catch (err) {
            console.log("Error in loadUser = " + err);
        }
    }




    //Register user


    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/users', formData, config);

            if (res.data.msg === 'User already exists') {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: res.data.msg
                });


            } else {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                });
                loadUser();
            }



        } catch (err) {
            console.log("Err in Register = " + err);
        }
    };




    //Login user


    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/auth', formData, config);

            if (res.data.msg) { //=== 'User already exists'
                dispatch({
                    type: LOGIN_FAIL,
                    payload: res.data.msg
                });


            } else {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                });
                loadUser();
            }

        } catch (err) {
            console.log("Err in Login = " + err);
        }
    }

    //Logout 
    const logout = () => dispatch({ type: LOGOUT });

    //CLear errors
    const clearError = () => (
        dispatch({
            type: CLEAR_ERRORS
        })
    )



    return (
        <AuthContext.Provider value={
            {
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                clearError,
                loadUser,
                login,
                logout

            }
        }
        >
            {props.children}
        </AuthContext.Provider>
    );

}


export default AuthState;
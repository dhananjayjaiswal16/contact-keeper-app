import React, { useReducer } from 'react'
import axios from 'axios';
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

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User 
    const loadUser = () => console.log("Load user");
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
            }


            loadUser();
        } catch (err) {
            console.log("Err in catch = " + err);
        }
    };




    //Login user
    //Logout 


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
                clearError

            }
        }
        >
            {props.children}
        </AuthContext.Provider>
    );

}


export default AuthState;
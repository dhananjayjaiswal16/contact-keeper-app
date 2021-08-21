import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import axios from 'axios';
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //GET CONTACT 

    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response
            })
        }
    }

    // ADD_CONTACT 
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response
            })
        }




    }

    // DELETE_CONTACT
    const deleteContact = (id) => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    }

    // SET_CURRENT
    const setCurrent = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    // CLEAR_CURRENT
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    //CLEAR CONTACT 
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        })
    }

    // UPDATE_CONTACT
    const updateContact = (contact) => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        })
    }

    // FILTER_CONTACTS
    const filterContacts = (contact) => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: contact
        })
    }

    // CLEAR_FILTER
    const clearFilter = (contact) => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: 1,
                type: "personal",
                name: "Maa",
                email: "maa@gmail.com",
                phone: "111-111-1111"
            },
            {
                id: 2,
                type: "personal",
                name: "Dj Bro",
                email: "digvijay@gmail.com",
                phone: "222-222-2222"
            },
            {
                id: 3,
                type: "personal",
                name: "Marsh",
                email: "marsh@gmail.com",
                phone: "888-888-8888"
            }
        ],
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // ADD_CONTACT 
    const addContact = (contact) => {
        contact.id = uuidv4();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })
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
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
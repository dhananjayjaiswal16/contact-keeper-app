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
                _id: 1,
                type: "personal",
                name: "Maa",
                email: "maa@gmail.com",
                phone: "111-111-1111"
            },
            {
                _id: 2,
                type: "personal",
                name: "Dj Bro",
                email: "digvijay@gmail.com",
                phone: "222-222-2222"
            },
            {
                _id: 3,
                type: "personal",
                name: "Marsh",
                email: "marsh@gmail.com",
                phone: "888-888-8888"
            }
        ]
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


    // SET_CURRENT


    // CLEAR_CURRENT


    // UPDATE_CONTACT


    // FILTER_CONTACTS


    // CLEAR_FILTER


    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
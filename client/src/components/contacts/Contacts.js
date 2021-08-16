import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts } = contactContext;
    console.log("contacts = " + contacts);
    return (
        <div>
            { contacts?.map(contact => <h3> {contact.name} </h3>)}
        </div>
    )
}

export default Contacts;
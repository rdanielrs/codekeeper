import React from 'react';
//import HeaderGlobal from '../../components/Global/HeaderGlobal';
import HeaderGlobal from '../components/Global/HeaderGlobal'
import ContactInfo from '../components/Contact/ContactInfo';
import '../styles/Contact.css'

const Contact = () => {
    return(
        <>
            <div className="container-global-header">
                <HeaderGlobal />
            </div>

            <div className="contact-info-component">
                <ContactInfo />
            </div>

        
        </>
    )
}

export default Contact
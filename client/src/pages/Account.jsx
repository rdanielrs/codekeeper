import React from 'react';
import HeaderGlobal from '../components/Global/HeaderGlobal';
import ContactInfo from '../components/Contact/ContactInfo';

const Account = () => {
    return(
        <>
            <div className="container-header-global">
                <HeaderGlobal/>
            </div>

            <div className="container-account-component">
                <ContactInfo/>
            </div>

        </>
    )
}

export default Account;
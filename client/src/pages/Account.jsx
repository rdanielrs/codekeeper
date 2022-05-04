import React from 'react';
import HeaderGlobal from '../components/Global/HeaderGlobal';
//import ContactInfo from '../components/Contact/ContactInfo';
import AccountMenu from '../components/Account/AccountMenu';
import '../styles/Account.css';

const Account = () => {
    return(
        <>
            <div className="container-header-global">
                <HeaderGlobal/>
            </div>

            <div className="container-account-component">
                <AccountMenu/>
            </div>

        </>
    )
}

export default Account;
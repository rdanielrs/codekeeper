import React from 'react';
import '../styles/CreateAccount.css'
import '../styles/Mobile/CreateAccount.css'

import Register from '../components/CreateAccount/Register'
import HeaderIndex from '../components/Index/HeaderIndex';
//import FooterIndex from '../components/Index/FooterIndex'

const CreateAccount = () => {
    return(
        <>
            <div className="container-header-index">
                <HeaderIndex/>

            </div>

            <div className="container-component-register">
                <Register/>
            </div>

           
        </>
    )
};

export default CreateAccount;
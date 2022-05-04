import React from 'react';
import HeaderIndex from '../components/Index/HeaderIndex';
import Login from '../components/Index/Login';
import FooterIndex from '../components/Index/FooterIndex';
import '../styles/Index.css'

const Index = () => {
    return(
        <>
            <div className="container-header-index">
                <HeaderIndex/>
            </div>
            <div className="container-login-index">
                <Login/>
            </div>

            <div className="container-login-footer">
                <FooterIndex/>
            </div>
        </>
    )
}

export default Index
import React from 'react';
import '../styles/Homepage.css'
//import { useParams } from 'react-router-dom';

import HeaderGlobal from '../components/Global/HeaderGlobal';
import UserMenu from '../components/Homepage/UserMenu';

const Homepage = () => {
    //const { id } = useParams();

    return(
        <>
            <HeaderGlobal/>
            <UserMenu/>
        
        </>
    )
}

export default Homepage
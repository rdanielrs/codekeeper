import React from 'react';
//import '../styles/Information';
import '../styles/Information.css'
import HeaderGlobal from '../components/Global/HeaderGlobal';
import MoreInfo from '../components/Information/MoreInfo';

const Information = () => {
    return(
        <>
            <div className="container-header-global">
                <HeaderGlobal/>
            </div>

            <div className="container-info-component">
                <MoreInfo/>
            </div>
        </>
    )
}

export default Information;
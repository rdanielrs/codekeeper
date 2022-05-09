import React from 'react';
import HeaderGlobal from '../components/Global/HeaderGlobal';
import FileMenu from '../components/File/FileMenu';
import '../styles/File.css';
import '../styles/Mobile/File.css';

const File = () => {
    return(
        <>
            <div className="container-header-global">
                <HeaderGlobal/>
            </div>

            <div className="container-main-component">
                <FileMenu/>
            </div>
        
        
        </>
    )
}

export default File
import React from 'react';
import '../styles/Folder.css'
import '../styles/Mobile/Folder.css'
//import { useParams } from 'react-router-dom';
import HeaderGlobal from '../components/Global/HeaderGlobal';
import FolderMenu from '../components/Folder/FolderMenu';


const Folder = () => {

    //const { id } = useParams();

    return(
        <>
            <HeaderGlobal/>
            <div className="container-folder-menu">

                <FolderMenu/>
            </div>
        </>
    )

}

export default Folder;
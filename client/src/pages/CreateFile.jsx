import React from 'react';
//import { useParams } from 'react-router-dom';

import '../styles/CreateFile.css'

import HeaderGlobal from '../components/Global/HeaderGlobal';
import FileForm from '../components/CreateFile/FileForm';

//import api from '../services/api'

const CreateFile = () => {



    return(
        <>
            <div className="header-container-form">
                <HeaderGlobal/>

            </div>
            <div className="container">
                <FileForm/>   

            </div>
        </>
    )
}

export default CreateFile;
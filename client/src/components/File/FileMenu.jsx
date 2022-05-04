import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api'

const FileMenu = () => {
    const { id } = useParams();
    const { folderid } = useParams();
    const { fileid } = useParams();
    let navigate = useNavigate();

    const [ file, setFile ] =  useState({ file_title: '', file_description: '', file_code: [], file_created_at: '', file_id: ''});

    useEffect(() => {
        api.get(`folders/user/${id}/folder/${folderid}/file/${fileid}`).then((response) => {
            if (response.status === 200) {
                
                setFile(response.data)
            }
        })
    }, [id, folderid, fileid])

    const showInfo = () => {
        var teste = '';
        for (let i = 0; i < file.file_code.length; i++) {
            teste += file.file_code[i] + '\n';
            
        }
        navigator.clipboard.writeText(teste);
    }

    const copyCode = () => {
        var teste = '';
        for (let i = 0; i < file.file_code.length; i++) {
            teste += file.file_code[i] + '\n';
            
        }
        navigator.clipboard.writeText(teste);
    }
    

    const handleRemove = () => {
        console.log('teste')
        api.delete(`folders/user/${id}/folder/${folderid}/file/${fileid}`).then((response) => {
            
            if (response.status === 200) {
                navigate(`/folder/${id}/${folderid}`)
                console.log(response.status)
            }
        })
    }
    
    const returnToFolder = () => {
        navigate(`/folder/${id}/${folderid}`)
        //navigate(``)
    }

   

    return(
        <>
            <div className="container-file-menu">
                <div className="file-menu-header">
                    <div className="file-menu-title">
                        <h3 onClick={showInfo}>{file.file_title}</h3>
                        <p>{file.file_description}</p>
                    </div>

                    <div className="file-menu-buttons">
                        <button onClick={returnToFolder} className="file-menu-button">Voltar</button>
                        <button onClick={copyCode} className="file-menu-button">Copiar arquivo</button>
                        <button onClick={handleRemove} className="file-menu-button">Remover arquivo</button>
                    </div>
                </div>

                <div className="container-file-code">
                    <div className="file-code-field">
                        {file.file_code.map((line) => (<div key={file.file_code.indexOf(line)} className='file-code-line'>
                            <p className='line-index'>{file.file_code.indexOf(line)}  </p>
                            <p className='line-code'>{line}</p>
                        </div>))}
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default FileMenu
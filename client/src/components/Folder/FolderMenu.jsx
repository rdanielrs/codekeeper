import React, {useState, useEffect} from 'react';
import { format} from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../../services/api'

const FolderMenu = () => {
    let navigate = useNavigate();

    const { id } = useParams();
    const { folderid } = useParams();


    const [ noFileDisplay, setNoFileDisplay ] = useState('flex');
    const [ folder, setFolder] = useState({title: '', files: [], created_at: '', id: ''});
    
    useEffect(() => {
        api.get(`folders/user/${id}/folder/${folderid}`).then((response) => {
            if (response.status === 200) {
                setFolder(response.data)
            }

            
        })
    }, [id, folderid])


    useEffect(() => {
        if (folder.files.length > 0) {
            
            setNoFileDisplay('none')
        }
    }, [folder])

    const showId = () => {
        console.log(id);
        console.log(folderid);
    }

    const handleDelete = () => {
        api.delete(`folders/user/${id}/folder/${folderid}`).then((response) => {
            if (response.status === 200) {
                navigate(`/homepage/${id}`)
            }
        })
    }

    const redirectNewFile = () => {
        navigate(`/folder/${id}/${folderid}/newfile`)
    }

    const redirectToFile = (event) => {
        navigate(`/folder/${id}/${folderid}/file/${event.target.id}`)
    }

    return(
        <>
            <div className="container-folder-menu">
                <div className="folder-menu">
                    <div className="folder-header">
                        <div className="title-container">
                            <h2 className="green-title">{folder.title}</h2>
                        </div>


                        <div className="folder-options">
                            <ul className="folder-options-list">
                                <li><button onClick={redirectNewFile} className="folder-option">Adicionar arquivo</button></li>
                                <li><button onClick={showId} className="folder-option">Mostrar ids</button></li>
                                <li><button onClick={handleDelete} className="folder-option">Remover pasta</button></li>
                            </ul>
                        </div>
                    </div>

                    <div className="file-list-container">
                        <div className="file-list">

                            <div style={{ display: noFileDisplay }} className="no-file-container">
                                <div className="no-file">
                                    <h2 className="no-file-title"><i>Não há arquivos nesta pasta</i></h2>
                                </div>
                            </div>

                            {folder.files.map((file) => (<div onClick={(e) => redirectToFile(e)} id={file.id} key={file.id} className='file'>
                                <div className="folder-file-title">
                                    <h3 className='index-number-folder'>{folder.files.indexOf(file)}</h3>
                                    <h3>{file.file_title}</h3>
                                </div>

                                <div className="folder-file-description">
                                    <p>{file.file_description}</p>
                                </div>

                                <div className="folder-file-date">
                                    <p>{format(new Date(file.created_at), "dd/MM/yyyy")}</p>
                                </div>
                            </div>))}

                        </div>
                    </div>

                </div>
            </div>
        
        </>

    )
}

export default FolderMenu;
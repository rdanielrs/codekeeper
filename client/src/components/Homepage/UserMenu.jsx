import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import api from '../../services/api';

const UserMenu = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    //const [ folder, setFolder ] = useState({title: '', files: []});
    const [ folderTitle, setFolderTitle] = useState('');
    const [ userToken, setUserToken ] = useState("");

    const [ overlayState, setOverlayState ] = useState('none');
    
    const [ userFolders, setUserFolders ] = useState([]);

    const [ AzState, setAzState ] = useState('block');
    const [ ZaState, setZaState ] = useState('none');

    const [ recentState, setRecentState ] = useState('block');
    const [ oldState, setOldState ] = useState('none');

    const [ biggestState, setBiggestState ] = useState('block');
    const [ smallestState, setSmallestState ] = useState('none');

    const [ isBusy, setIsBusy ] = useState(true);

    const [ removeState, setRemoveState ] = useState('none');

    useEffect(() => {
        let x = document.cookie.split(";")
        console.log(x.length)
        if (x.length === 1) {
            //console.log("Teste")
            navigate('/');
        }

        if (x.length > 0) {
            let y = x[0].split("=")
            setUserToken(y[1])
            setIsBusy(false)
        }

    },[navigate])

    useEffect(() => {
    if (isBusy === false) {
        api.get(`/users/user/${ id }`, {
            headers: { authorization: `Bearer ${ userToken }`}
        }).then((response) => {
            if (response.status === 200) {
                setUserFolders(response.data.user_folders);       
            }
        }) 
        }
    }, [userToken, id, isBusy])

    const addFolder = () => {
        api.post(`/folders/user/${id}`, {
            title: folderTitle,
            files: []
        }).then((response) => {
            if (response.status === 200) {
                api.get(`/folders/user/${id}`).then((response) => {
                    //setFolderTitle('')
                    setOverlayState('none');
                    setFolderTitle('')
                    setUserFolders(response.data);

                })
            }

        })
    }

    const redirectToFolder = (event) => {
        //console.log(event.target.id)
        navigate(`/folder/${id}/${event.target.id}`)
    }

    const showFolder = () => {
        //console.log(folder)
        //console.log(userFolders[0].folder_title)

        api.get(`/folders/user/${id}`).then((response) => {
            console.log(response.data)
        })
    }

    const showOverlay = () => {
        setOverlayState('flex');
    }

    const hideOverlay = () => {
        setOverlayState("none")
    }

    const handleAddInput = (event) => {
        if (event.key === 'Enter') {
            addFolder();
            setFolderTitle('');
            setOverlayState('none');
        }
    }

    const handleFilter = (event) => {
        //console.log(event.target.id)

        switch(event.target.id) {
            default:
                break;
            case 'a-z':
                setAzState('none');
                setZaState('block');

                setRecentState('block');
                setOldState('none');

                setBiggestState('block')
                setSmallestState('none');

                setRemoveState('block')

                api.get(`/filter/${id}/sort/a-z`).then((response) => {
                    console.log(response.data.sorted)
                    setUserFolders(response.data.sorted);
                })


                break;
            case 'z-a':
                setAzState('block');
                setZaState('none');

                setRecentState('block');
                setOldState('none');

                setBiggestState('block')
                setSmallestState('none');

                setRemoveState('block')

                api.get(`/filter/${id}/sort/z-a`).then((response) => {
                    console.log(response.data.sorted)
                    setUserFolders(response.data.sorted);
                })

                break;
            case 'recent':
                setAzState('block');
                setZaState('none');

                setRecentState('none');
                setOldState('block');

                setBiggestState('block')
                setSmallestState('none');

                setRemoveState('block')

                api.get(`/filter/${id}/sort/recent`).then((response) => {
                    console.log(response.data.sorted)
                    setUserFolders(response.data.sorted);
                })

                break;
            case 'old':
                setAzState('block');
                setZaState('none');

                setRecentState('block');
                setOldState('none');

                setBiggestState('block')
                setSmallestState('none');

                setRemoveState('block')

                api.get(`/filter/${id}/sort/old`).then((response) => {
                    console.log(response.data.sorted)
                    setUserFolders(response.data.sorted);
                })
                break;

            case 'biggest':
                setAzState('block');
                setZaState('none');

                setRecentState('block');
                setOldState('none');

                setBiggestState('none');
                setSmallestState('block');

                setRemoveState('block')

                api.get(`/filter/${id}/sort/biggest`).then((response) => {
                    console.log(response.data.sorted)
                    setUserFolders(response.data.sorted);
                })

                break;
            case 'smallest':
                setAzState('block');
                setZaState('none');

                setRecentState('block');
                setOldState('none');

                setBiggestState('block');
                setSmallestState('none');

                setRemoveState('block')

                api.get(`/filter/${id}/sort/smallest`).then((response) => {
                    console.log(response.data.sorted)
                    setUserFolders(response.data.sorted);
                })

                break;

            case 'remove':
                setAzState('block');
                setZaState('none');

                setRecentState('block');
                setOldState('none');

                setBiggestState('block');
                setSmallestState('none');

                setRemoveState('none')

                api.get(`/folders/user/${id}`).then((response) => {
                    //setFolderTitle('')
                    //setOverlayState('none');
                    //setFolderTitle('')
                    setUserFolders(response.data);

                })
        }
    }
 
    return(
        <>
            <div className="container-user-menu">
               <div className="user-menu">
                    <div className="user-menu-header">
                        <h2 onClick={showFolder} className="green-title">Seus arquivos</h2>
                    </div>

                    <div className="user-menu-subheader">

                        <div className="add-button-container">
                            <button onClick={showOverlay} id='add-button' className="user-menu-option">Adicionar pasta</button>
                        </div>

                        <div className="container-menu-options">

                            <ul className="user-menu-options">
                                {/*<li><button onClick={showOverlay} id='add-button' className="user-menu-option">Adicionar pasta</button></li>*/}
                                <li><button id='a-z' style={{ display: AzState }} onClick={(e) => handleFilter(e)} className="user-menu-option"><i id='option-arrow' className="fa-solid fa-chevron-up"></i>A-z</button></li>
                                <li><button id='z-a' style={{ display: ZaState }} onClick={(e) => handleFilter(e)} className="user-menu-option"><i id='option-arrow' className="fa-solid fa-chevron-down"></i>z-A</button></li>
                                <li><button id='recent' style={{ display: recentState }} onClick={(e) => handleFilter(e)} className="user-menu-option"><i id='option-arrow' className="fa-solid fa-chevron-up"></i> Mais recente</button></li>
                                <li><button id='old' style={{ display: oldState }} onClick={(e) => handleFilter(e)} className="user-menu-option"><i id='option-arrow' className="fa-solid fa-chevron-down"></i> Mais antigo</button></li>
                                <li><button id='biggest' style={{ display: biggestState }} onClick={(e) => handleFilter(e)} className="user-menu-option"><i id='option-arrow' className="fa-solid fa-chevron-up"></i> Maior</button></li>
                                <li><button id='smallest' style={{ display: smallestState }} onClick={(e) => handleFilter(e)} className="user-menu-option"><i id='option-arrow' className="fa-solid fa-chevron-down"></i> Menor</button></li>
                                <li><button id='remove' style={{ display: removeState }} onClick={(e) => handleFilter(e)} className="user-menu-option">Remover filtros</button></li>
                            </ul>
                        </div>
                    </div>

                    <div className="user-menu-files">

                        {userFolders.map((folder) => (
                        <div onClick={(e) => redirectToFolder(e)} id={folder.id} className='user-file' key={userFolders.indexOf(folder)}>
                            <div className="user-file-icon">
                                <i className="fa-solid fa-folder"></i>
                            </div>

                            <div className="user-file-info">
                                <h3>{folder.title}</h3>
                                <p className="date-info">{format(new Date(folder.created_at), "dd/MM/yyyy")}</p>
                            </div>
                        </div>))}
                    </div>
               </div>
            </div>

            {<div style={{display: overlayState}} className="usermenu-overlay">
                <div className="new-folder-container">
                    <div className="new-folder-close">
                        <button className='close-button' onClick={hideOverlay}><i className="fa-solid fa-xmark"></i></button>
                    </div>

                    <div className="new-folder-form">
                        <h3>Título</h3>
                        <input value={folderTitle} onKeyDown={(e) => handleAddInput(e)} placeholder='Título da pasta' className='new-folder-title' onChange={(e) => setFolderTitle(e.target.value)} type="text" />
                    </div>

                    <div className="folder-button-container">
                        <button onClick={addFolder} className="create-folder-button">Criar</button>
                    </div>
                </div>
        </div>}
        </>
    )
}

export default UserMenu;
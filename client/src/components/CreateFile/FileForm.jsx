import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../../services/api'

const FileForm = () => {
    const { id } = useParams();
    const { folderid } = useParams();

    let navigate = useNavigate();

    //const codeRef = React.createRef();

    const [file_title, setFileTitle] = useState('');
    const [file_description, setFileDescription] = useState('');
    const [ file_code, setFileCode ] = useState(['']);
    const [ lineCounter, setLineCounter ] = useState([0])

    const [ displayInfo, setDisplayInfo ] = useState('flex');
    const [ displayCode, setDisplayCode ] = useState('none');
    
    
    useEffect(() => {
        api.get(`folders/user/${id}/folder/${folderid}`).then((response) => {
            if (response.status === 200) {
                
                console.log(response.data)
                
            }
        })
    }, [id, folderid])

    //const [ space ] = useState('      ');

    const saveFile = () => {
        //"/user/:id/folder/:folderid"
        

        api.post(`folders/user/${id}/folder/${folderid}`, {
            file_title: file_title,
            file_description: file_description,
            file_code: file_code
        }).then((response) => {
            if (response.status === 200) {
                console.log("Arquivo publicado.")
                console.log(response.data)
                navigate(`/folder/${id}/${folderid}`)
            }
        })
    }

    const showId = () => {
        console.log(id, folderid)
        /*api.get("/users").then((response) => {
            console.log(response.data)
        })*/

        console.log(lineCounter.length)
        console.log(file_code)
        console.log(lineCounter)
    }

   const Listen = (event) => {
       switch(event.key) {
           default:
                break;
            case 'Enter':
                //setLineCounter([...lineCounter, lineCounter.length])
                setFileCode([...file_code, ''])

                /*if (lineCounter.length - Number(event.target.id) === 1) {
                    setLineCounter([...lineCounter, lineCounter.length])
                }*/

                if (lineCounter.length - Number(event.target.id) === 1) {
                    setLineCounter([...lineCounter, lineCounter[lineCounter.length - 1] += 1])
                }

                setTimeout(() => {
                    document.getElementById(`${Number(event.target.id) + 1}`).focus()
                }, 1)
                break;
            case 'Tab': 
                event.preventDefault();
                //addSpace(event)
                document.getElementById(`${event.target.id}`).value = event.target.value + '    '
                break;

            case 'Backspace':
                if (event.target.selectionStart === 0 && event.target.id !== '0') {
                    event.preventDefault();
                    document.getElementById(`${Number(event.target.id) - 1}`).focus()
                    setLineCounter(lineCounter.filter((item, index) => index !== Number(event.target.id)))
                    setFileCode(file_code.filter((item, index) => index !== Number(event.target.id)))
                }
                break;
            case 'ArrowUp':
                if (event.target.id !== '0') {
                    event.preventDefault();
                    document.getElementById(`${Number(event.target.id) - 1}`).focus()
                }
                break;
            case 'ArrowDown':
                if (event.target.id !== `${lineCounter.length - 1}`) {
                    event.preventDefault();
                    document.getElementById(`${Number(event.target.id) + 1}`).focus()
                }
       }
    }

    const cancelNewFile = () => {
        navigate(`/folder/${id}/${folderid}`)
    }

    const showInfo = () => {
        setDisplayInfo('none')
        setDisplayCode('block')
    }

    const showCode = () => {
        setDisplayInfo('flex')
        setDisplayCode('none')
    }

    const clearCode = () => {
        setLineCounter([0])
        setFileCode([])
        document.getElementById(0).value = ''
    }

    const nextInput = (event) => {
        if (event.key === 'Enter') {
            switch(event.target.id) {
                default:
                    break;
                case 'title':
                    document.getElementById('description').focus()
                    break;
                case 'description':

            }
        }
    }

    const handleValues = (event) => {
        //console.log(event.target.value)
        //console.log(event.target.id)

        file_code[Number(event.target.id)] = event.target.value
    }

    return(
        <>
            <div className="container-file-form">
                <div className="file-form">
                    <div className="file-form-header">
                        <h2 onClick={showId} className="green-title">Novo arquivo</h2>
                    </div>

                    <div className="file-buttons">
                        <button onClick={saveFile} className="file-button">Salvar</button>
                        <button onClick={cancelNewFile} className="file-button">Cancelar</button>
                        <button onClick={clearCode} style={{ display: displayCode }} className="file-button">Apagar código</button>
                        <button style={{display: displayCode}} id='code' onClick={showCode} className="file-button">Voltar</button>
                        <button style={{display: displayInfo}} onClick={showInfo} id='info' className="file-button">Código</button>
                    </div>

                    <div style={{ display: displayInfo }} className="file-title-container">
                        <input onKeyDown={(e) => nextInput(e)} id='title' className='file-title' onChange={(e) => setFileTitle(e.target.value)} placeholder='titulo' type="text" />
                        <textarea className='file-description' placeholder='Descrição' value={file_description} onChange={(e) => setFileDescription(e.target.value)} name="description-text" id="description" cols="30" rows="10"></textarea>
                    </div>


                    <div style={{ display: displayCode }} className="file-code-container">
                        {/*<h3 className="green-title">Código</h3>*/}

                        {lineCounter.map((line) => (<div className='code-container' key={line}>
                            <h3>{lineCounter.indexOf(line)}</h3>
                            <input onChange={(e) => {handleValues(e)}} id={lineCounter.indexOf(line)} onKeyDown={(e) => Listen(e)} className='file-code' type="text" />
                        </div>))}

                    </div>

                </div>
            </div>

            {/*<div className="container-code-space">
                <div className="file-code-container">
                    <h3 onClick={testArray} className="green-title">Código</h3>
                    {lineCounter.map((line) => (<div className='code-container' key={line}>
                        <h3>{lineCounter.indexOf(line)}</h3>
                        <input id={lineCounter.indexOf(line)} onKeyDown={(e) => Listen(e)} className='file-code' type="text" />
                    </div>))}

                </div>
        </div>*/}
        </>
    )
}

export default FileForm;
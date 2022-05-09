import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Mobile/HeaderGlobal.css';


const HeaderHomepage = () => {
    //const { id } = useParams();
    const [ id, setId ] = useState('');
    let navigate = useNavigate();

    const [ username, setUsername ] = useState('');
    const [ userToken, setUserToken ] = useState('');
    const [ isBusy, setIsBusy ] = useState(true);

    const [ displayButton, setDisplayButton ] = useState('block')
    const [ mobileOverlay, setMobileOverlay ] = useState('none')

    useEffect(() => {
        let x = document.cookie.split(";")
        //console.log(x)
        if (x.length > 1) {
            let y = x[0].split("=")
            let z = x[1].split("id=")
            setId(z[1])
            setUserToken(y[1])
            setIsBusy(false)
            //console.log(y[1])
        } else {
            setUsername("Codekeeper")
            setDisplayButton('none')
            
        }
        

    }, [navigate])

    useEffect(() => {  
        //setIsBusy(false)
        //let x = document.cookie.split(";")
        if (isBusy === false) {
            api.get(`/users/user/${ id }`, {
                headers: { authorization: `Bearer ${ userToken }`}
            }).then((response) => {
                
                
                if (response.status === 200) {
                    //setUserFolders(response.data.user_folders);
                    setUsername(response.data.username)
                }
            })
        } 
    }, [userToken, id, isBusy])

    const redirectHomepage = () => {
        navigate(`/homepage/${id}`)
    }

    const redirectToAccount = () => {
        navigate(`/account/${id}`)
    }

    const redirectToContact = () => {
        navigate("/contact")
    }

    const redirectToInfo = () => {
        navigate("/info")
    }

    const logOut = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=Lax"
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=Lax"
        navigate("/")
    }

    const showMenu = () => {
        
        if (mobileOverlay === 'flex') {
            setMobileOverlay('none')
        }

        if (mobileOverlay === 'none') {
            setMobileOverlay('flex')
        }
    }

    /*const teste = () => {
        console.log("Teste")
    }*/

    return(
        <>
            <header>
                <div className="container-header-homepage">
                    <div className="header-homepage">
                        <div className="title-container">
                            <h1>{username}</h1>
                        </div>

                        <div className="header-buttons-container">
                            <ul className="header-buttons">
                                <li><button onClick={redirectHomepage} className="header-button">Início</button></li>
                                <li><button style={{display: displayButton}} onClick={redirectToAccount} className="header-button">Conta</button></li>
                                <li><button onClick={redirectToContact} className="header-button">Contato</button></li>
                                <li><button onClick={redirectToInfo} className="header-button">Sobre</button></li>
                                <li><button style={{ display: displayButton }} onClick={logOut} className="header-button">Sair</button></li>
                            </ul>
                            <button onClick={showMenu} className="mobile-button"><i className="fa-solid fa-bars"></i></button>
                        </div>
                    </div>
                </div>
            </header>

            <div style={{ display: mobileOverlay }} className="overlay-menu-mobile">
                <div className="menu-mobile-container">
                    <div className="menu-mobile-header">
                        <button onClick={showMenu} className="mobile-button"><i className="fa-solid fa-bars"></i></button>
                    </div>
                    
                    <ul className="menu-mobile">
                        <li><button onClick={redirectHomepage} className='global-button'>Início</button></li>
                        <li><button onClick={redirectToAccount} className='global-button'>Conta</button></li>
                        <li><button onClick={redirectToContact} className='global-button'>Contato</button></li>
                        <li><button onClick={redirectToInfo} className='global-button'>Sobre</button></li>
                        <li><button onClick={logOut} className='global-button'>Sair</button></li>
                    </ul>
                </div>
            </div>
        
        </>
    )
}

export default HeaderHomepage;
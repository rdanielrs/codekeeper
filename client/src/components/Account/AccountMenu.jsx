import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const AccountMenu = () => {
    const { id } = useParams();
    const [ userToken, setUserToken ] = useState('');
    const [ user, setUser ] = useState({ username: '', user_folders: [] });
    
    const [ accountMenuState, setAccountMenuState ] = useState('none');

    const [ newNameState, setNewNameState ] = useState('none');

    const [ newPasswordState, setNewPasswordState ] = useState('none');

    const [ removeAccountState, setRemoveAccountState ] = useState('flex')

    const [ isBusy, setIsBusy ] = useState(true);

    useEffect(() => {
        let x = document.cookie.split(";");
        if (x.length > 1) {
            let y = x[0].split("=");
            setUserToken(y[1])
            setIsBusy(false);
        }
    }, [])

    useEffect(() => {
        if (isBusy === false) {
            api.get(`/users/user/${ id }`, {
                headers: { authorization: `Bearer ${ userToken }`}
            }).then((response) => {
                if (response.status === 200) {
                    setUser(response.data);
                    console.log("Teste")
                }
            })
        }

    }, [userToken, isBusy, id])

    const showUser = () => {
        console.log(user.user_folders.length)
    }

    

    const showAccountMenu = () => {
        setAccountMenuState('flex');
        setNewNameState('none')
        setNewPasswordState('none')
        setRemoveAccountState('none');
    }

    const showNewName = () => {
        setAccountMenuState('none');
        setNewNameState('flex');
        setNewPasswordState('none');
        setRemoveAccountState('none');
    }

    const showNewPassword = () => {
        setAccountMenuState('none');
        setNewNameState('none');
        setNewPasswordState('flex');
        setRemoveAccountState('none');
    }

    const showDeleteAccount = () => {
        setAccountMenuState('none');
        setNewNameState('none');
        setNewPasswordState('none');
        setRemoveAccountState('flex');
    }

    return(
        <>
            <div className="container-account-menu">
                <div style={{ display: accountMenuState }} className="account-menu">
                    <div className="account-menu-header">
                        <h2 onClick={showUser}>Sua conta</h2>
                    </div>

                    <div className="account-menu-subheader">
                        <button onClick={showNewName} className="global-button">Alterar nome</button>
                        <button onClick={showNewPassword} className="global-button">Alterar senha</button>
                        <button onClick={showDeleteAccount} className="global-button">Apagar conta</button>
                    </div>

                    <div className="account-menu-information">
                        <p className='user-info-text'>Nome: { user.username }</p>
                        <p className='user-info-text'>Pastas: {user.user_folders.length}</p>
                        <p className='user-info-text'>Data de criação: 21/03/2020</p>
                    </div>
                </div>

                <div style={{ display: newNameState }} className="new-username-menu">
                    <div className="new-username-header">
                        <h2>Alterar nome</h2>
                    </div>

                    <div className="new-credentials-form">

                        <div className="change-credentials-container">
                            <input className='credential-input' type="text" placeholder="Novo nome" />
                        </div>

                        <div className="change-credentials-container">
                            <input className='credential-input' type="password" placeholder='Senha' />
                        </div>

                        <div className="change-credentials-container">
                            <button className="global-button">Salvar</button>
                            <button onClick={showAccountMenu} className="global-button">Cancelar</button>
                        </div>

                    </div>

                </div>

                <div style={{ display: newPasswordState }} className="new-password-menu">
                    <div className="new-password-header">
                        <h2>Alterar senha</h2>
                    </div>

                    <div className="new-credentials-form">
                        <div className="change-credentials-container">
                            <input className='credential-input' type="password" placeholder="Senha atual"/>
                        </div>

                        <div className="change-credentials-container">
                            <input className='credential-input' type="password" placeholder="Nova senha"/>
                        </div>

                        <div className="change-credentials-container">
                            <button className="global-button">Salvar</button>
                            <button onClick={showAccountMenu} className="global-button">Cancelar</button>
                        </div>

                    </div>
                </div>

                <div style={{ display: removeAccountState }} className="remove-account-menu">
                    <div className="remove-account-header">
                        <h2>Remover conta</h2>
                    </div>

                    <div className="change-credentials-container">
                        <input type="password" placeholder='Insira sua senha' className="credential-input" />
                    </div>

                    <div className="change-credentials-container">
                            <button className="global-button">Salvar</button>
                            <button onClick={showAccountMenu} className="global-button">Cancelar</button>
                        </div>
                </div>

            </div>
        </>
    )
}

export default AccountMenu;
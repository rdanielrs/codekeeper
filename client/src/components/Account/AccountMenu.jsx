import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AccountMenu = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [ userToken, setUserToken ] = useState('');
    const [ user, setUser ] = useState({ username: '', user_folders: [] });

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('');

    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');

    const [ removePassword, setRemovePassword ] = useState('');
    
    const [ accountMenuState, setAccountMenuState ] = useState('flex');

    const [ newNameState, setNewNameState ] = useState('none');

    const [ newPasswordState, setNewPasswordState ] = useState('none');

    const [ removeAccountState, setRemoveAccountState ] = useState('none')


    const [ confirmUsernameDisplay, setConfirmUsernameDisplay ] = useState('block');
    const [ changeUsernameDisplay, setChangeUsernameDisplay ] = useState('none');

    const [ confirmPasswordDisplay, setConfirmPasswordDisplay ] = useState('block');
    const [ changePasswordDisplay, setChangePasswordDisplay ] = useState('none');
    
    const [ confirmRemoveDisplay, setConfirmRemoveDisplay ] = useState('block');
    const [ removeDisplay, setRemoveDisplay ] = useState('none')

    const [ isBusy, setIsBusy ] = useState(true);

    useEffect(() => {
        let x = document.cookie.split(";");
        if (x.length > 1) {
            let y = x[0].split("=");
            setUserToken(y[1])
            setIsBusy(false);
        } else {
            navigate("/")
        }
    }, [navigate])

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
        console.log(userToken)
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

    const confirmUsername = () => {
        setConfirmUsernameDisplay('none');
        setChangeUsernameDisplay('block');
    }

    const changeUsername = () => {
        /*setConfirmUsernameDisplay('block');
        setChangeUsernameDisplay('none');*/

        api.put(`/users/user/username/${id}`, {
            newUsername: username,
            password: password
        }).then((response) => {
            if (response.status === 200) {
                setUser({ username: username, user_folders: user.user_folders });
                //console.log("Nome alterado com sucesso")
                //setUsername('');
                //setPassword('');
                document.location.reload()
                //showAccountMenu();
            }
        })

    }

    const nextInputUsername = (event) => {
        if (event.key === 'Enter') {

            switch(event.target.id) {
                default:
                    break;
                case 'username':
                    document.getElementById('password').focus();
                    break;
                case 'password':
                    if (confirmUsernameDisplay === 'block') {
                        //setConfirmUsernameDisplay('none')
                        //setChangeUsernameDisplay('block')
                        confirmUsername()
                    }
    
                    if (changeUsernameDisplay === 'block') {
                        changeUsername()
                    }
                    break;
                    //document.getElementById('confirmUsername').focus();
            }
        }
    }

    const nextInputPassword = (event) => {
        if (event.key === 'Enter') {
            switch(event.target.id) {
                default:
                    break;
                case 'current-password':
                    document.getElementById('new-password').focus();
                    break;
                case 'new-password':
                    if (confirmPasswordDisplay === 'block') {
                        //setConfirmPasswordDisplay('none')
                        //setChangePasswordDisplay('block')
                        confirmPassword()
                    }

                    if (changePasswordDisplay === 'block') {
                        changePassword()
                    }
            }
        }
    }

    const nextInputDelete = (event) => {
        if (event.key === 'Enter' && confirmRemoveDisplay === 'block') {
            confirmDeleteAccount()
        }

        if (event.key === 'Enter' && removeDisplay === 'block') {
            handleDeleteAccount()
        }
    }

    const confirmPassword = () => {
        setConfirmPasswordDisplay('none');
        setChangePasswordDisplay('block');
    }

    const changePassword = () => {
        /*setConfirmPasswordDisplay('block');
        setChangePasswordDisplay('none');*/

        api.put(`/users/user/password/${ id }`, {
            password: currentPassword,
            newPassword: newPassword
        }).then((response) => {
            if (response.status === 200) {
                //console.log("Senha alterada com sucesso")
                document.location.reload();
            }
        })
    }

    /*const nextInputDelete = (event) => {
        if (event.key === 'Enter' && confirmRemoveDisplay === 'block') {
            confirmDeleteAccount()
        }

        if (event.key === 'Enter' && removeDisplay === 'block') {
            handleDeleteAccount()
        }
    }*/

    const confirmDeleteAccount = () => {
        setConfirmRemoveDisplay('none');
        setRemoveDisplay('block');
    }

    const handleDeleteAccount = () => {
        api.delete(`/users/user/delete/${id}`, {
            password: removePassword
        }).then((response) => {
            if (response.status === 200) {
                navigate("/")
            }
        })
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
                            <input onKeyDown={(e) => nextInputUsername(e)} id='username' value={username} onChange={(e) => setUsername(e.target.value)} className='credential-input' type="text" placeholder="Novo nome" />
                        </div>

                        <div className="change-credentials-container">
                            <input onKeyDown={(e) => nextInputUsername(e)} id='password' value={password} onChange={(e) => setPassword(e.target.value)} className='credential-input' type="password" placeholder='Senha' />
                        </div>

                        <div className="change-credentials-container">
                            <button style={{ display: confirmUsernameDisplay }} onClick={confirmUsername} className="global-button">Salvar</button>
                            <button style={{ display: changeUsernameDisplay }} onClick={changeUsername} className="global-button">Tem certeza?</button>
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
                            <input onKeyDown={(e) => nextInputPassword(e)} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} id='current-password' className='credential-input' type="password" placeholder="Senha atual"/>
                        </div>

                        <div className="change-credentials-container">
                            <input onKeyDown={(e) => nextInputPassword(e)} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id='new-password' className='credential-input' type="password" placeholder="Nova senha"/>
                        </div>

                        <div className="change-credentials-container">
                            <button onClick={confirmPassword} style={{ display: confirmPasswordDisplay }} className="global-button">Salvar</button>
                            <button onClick={changePassword} style={{ display: changePasswordDisplay }} className="global-button">Tem certeza?</button>
                            <button onClick={showAccountMenu} className="global-button">Cancelar</button>
                        </div>

                    </div>
                </div>

                <div style={{ display: removeAccountState }} className="remove-account-menu">
                    <div className="remove-account-header">
                        <h2>Remover conta</h2>
                    </div>

                    <div className="change-credentials-container">
                        <input onKeyDown={(e) => nextInputDelete(e)} value={removePassword} onChange={(e) => setRemovePassword(e.target.value)} id='remove-password' type="password" placeholder='Insira sua senha' className="credential-input" />
                    </div>

                    <div className="change-credentials-container">
                            <button style={{ display: confirmRemoveDisplay }} onClick={confirmDeleteAccount} className="global-button">Remover</button>
                            <button style={{ display: removeDisplay }} onClick={handleDeleteAccount} className="global-button">Tem certeza?</button>
                            <button onClick={showAccountMenu} className="global-button">Cancelar</button>
                        </div>
                </div>

            </div>
        </>
    )
}

export default AccountMenu;
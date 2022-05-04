import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Register = () => {
    let navigate = useNavigate();
    const passwordRef = React.createRef();
    const confirm_passwordRef = React.createRef();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const redirectToLogin = () => {
        navigate('/');
    }

    const handleRegister = () => {
        api.post("/users", {
            username: username,
            password: password,
            confirm_password: confirmPassword,
            user_folders: []
        }).then((response) => {
            if (response.status === 200) {
                navigate('/');
            }
        })
    };

    const nextInput = (event) => {
        if (event.key === 'Enter') {
            //console.log("Tecla enter pressionada")
            switch(event.target.id) {
                default:
                    break;
                case "username":
                    passwordRef.current.focus();
                    break;
                case "password":
                    confirm_passwordRef.current.focus();
                    break;
                case "confirm_password":
                    handleRegister();
                    break;
            }

        }
    }

    return(
        <>
            <div className="register-container">
                <div className="register-box">
                    <div className="register-header">
                        <h1>Cadastro</h1>
                    </div>

                    <div className="register-username">
                        
                        <input placeholder='Username' className='username-input' id='username' onKeyDown={(e) => nextInput(e)} value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                    </div>

                    <div className="register-password">
                        
                        <input placeholder='Password' className='password-input' id='password' onKeyDown={(e) => nextInput(e)} ref={passwordRef} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="" />
                    </div>

                    <div className="confirm-password">
                        <input placeholder='Confirm password' className='password-input' id='confirm_password' onKeyDown={(e) => nextInput(e)} ref={confirm_passwordRef} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="" />
                    </div>

                    <div className="register-button-container">
                        <button onClick={handleRegister} className="register-button">Cadastrar</button>
                    </div>

                    <div className="have-account-container">
                        <button onClick={redirectToLogin} className="have-account">Já tenho conta</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
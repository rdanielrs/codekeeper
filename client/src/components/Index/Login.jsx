import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
    let navigate = useNavigate();
    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ remember, setRemember ] = useState(false);

    const passwordRef = React.createRef();

    useEffect(() => {
        let x = document.cookie.split("id=")
        //console.log(x)
        
        if (x.length > 1) {
            navigate(`/homepage/${ x[1] }`)      

        }
    }, [navigate])


    const handleLogin = () => {
        api.post("/users/login", {
            username: username,
            password: password            
        }).then((response) => {
            if (response.status === 200) {
                
                handleAuth(response.data)

            }
        })   
    }

    const handleAuth = (data) => {
        api.get(`/users/user/${ data.userId }`, {
            headers: { authorization: `Bearer ${ data.token }` }
        }).then((response) => {
            if (response.status === 200) {
                if (remember === false) {
                    document.cookie = `token=${ data.token };SameSite=Lax;path=/;Secure`
                    document.cookie = `id=${ data.userId };SameSite=Lax;path=/;Secure`
                    navigate(`/homepage/${ data.userId }`)
                }

                if (remember === true) {
                    document.cookie = `token=${ data.token };SameSite=Lax;max-age=${259200};path=/;Secure`
                    document.cookie = `id=${ data.userId };SameSite=Lax;max-age=${259200};path=/;Secure`
                    navigate(`/homepage/${ data.userId }`)
                }
            }
        })
    }

    const nextInput = (event) => {
        if (event.key === 'Enter') {
            switch(event.target.id) {
                default:
                    break;
                case 'usernameId':
                    passwordRef.current.focus();
                    break;
                case 'passwordId':
                    handleLogin();
                    break;
            }
        }
    }

    const redirectToRegister = () => {
        navigate('/createaccount');
    }

    const verifyChecked = () => {
        console.log(remember)
    }


    return(
        <>
            <div className="login-container">
                {/*<div className="info-container">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem laudantium illum quae voluptates ipsam! Voluptatibus quasi mollitia beatae dolorem nulla fugit. Quidem ipsum eos dolore, doloribus repellendus veritatis consectetur ab.</p>
                </div>*/}

                <div className="login-box">
                    <div className="login-header">
                        <h1 onClick={verifyChecked}>Login</h1>
                    </div>

                    <div className="login-form">
                        <div className="login-username">
                            <input placeholder='Username' id="usernameId" className='username-input' onKeyDown={(e) => nextInput(e)} value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                        </div>

                        <div className="login-password">
                            <input placeholder='password' className='password-input' ref={passwordRef} id="passwordId" onKeyDown={(e) => nextInput(e)} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name=""/>
                        </div>

                        <div className="login-button-container">
                            <button onClick={handleLogin} className='login-button'>Login</button>
                        </div>

                        <div className="remember-me-container">
                            <input onChange={(e) => setRemember(e.target.checked)} type="checkbox" name="remember-me" id="remember-me" />
                            <label htmlFor="remember-me">Lembre-se de mim</label>
                        </div>

                        <div className="no-account-container">
                            <button onClick={redirectToRegister} className="no-account">Não tenho conta</button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Login;
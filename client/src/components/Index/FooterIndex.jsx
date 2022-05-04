import React from 'react';
import { useNavigate } from 'react-router-dom';

const FooterIndex = () => {
    let navigate = useNavigate();

    const redirectToInfo = () => {
        navigate('/info');
    }

    const redirectToContact = () => {
        navigate('/contact');
    }


    return(
        <>
            <footer>
                <div className="container-footer-index">
                    <div className="footer-index">
                        <div className="footer-index-links">
                            {/*<a href="/info">Mais informações</a>
                            <a href="/contact">Contato</a>*/}
                            <p onClick={redirectToInfo} className="link-index-footer">Mais informações</p>
                            <p onClick={redirectToContact} className="link-index-footer">Contato</p>
                        </div>
                    </div>
                </div>

            </footer>
        
        </>
    )
}

export default FooterIndex;
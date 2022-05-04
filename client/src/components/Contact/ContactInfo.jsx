import React from 'react';
//import HeaderGlobal from '../../components/Global/HeaderGlobal'

const ContactInfo = () => {
    return(
        <>
            <div className="container-contact-info">
                <div className="contact-info">
                    <div className="contact-info-title">
                        <h1>Contato</h1>
                    </div>

                    <div className="contact-info-text">
                        <p className='contact-text'>(99) 999189-4579</p>
                        <p className='contact-text'>daniel.r.sousa1911@gmail.com</p>
                        <a href="https://github.com/rdanielrs" className="github-link">https://github.com/rdanielrs</a>
                        <br />
                        <br />
                        <a href="https://www.linkedin.com/in/daniel-rodrigues-78b732224/" className='github-link'>LinkedIn</a>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default ContactInfo;
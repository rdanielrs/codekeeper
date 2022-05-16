import React from 'react';

const MoreInfo = () => {
    return(
        <>
            <div className="container-more-info">
                <div className="more-info">
                    <div className="more-info-title">
                        <h1>Sobre essa página</h1>
                    </div>

                    <div className="more-info-description">

                        <div className="sub-section">
                            <div className="info-sub-title">
                                <h2>Como usar</h2>
                            </div>

                            <div className="info-sub-description">
                                <p>Para utilizar as funcionalidades do site, crie uma conta, com um nome de usuário único, e adicione "pastas" que contém arquivos.</p>
                                <p>Arquivos podem conter linhas de código inseridas pelo usuário, que podem ser lidas e copiadas a qualquer momento.</p>
                                <p>Pastas de arquivos também podem ser filtradas. Atualmente, o site conta com 3 atributos de filtro: a-z, data de criação e tamanho.</p>
                            </div>
                        </div>

                        <div className="sub-section">
                            <div className="info-sub-title">
                                <h2>Objetivo</h2>
                            </div>

                            <div className="info-sub-description">
                                <p>O objetivo deste site é criar uma plataforma que permite o armazenamento organizado e padronizado de blocos de código, facilitando a reutilização dos mesmos para futura ocasiões.</p>
                                <p>Exemplo: durante o desenvolvimento de uma aplicação web, um programador precisa criar um requisito que efetua o login dos usuários. Já tendo esse código salvo em uma pasta de arquivos de sua escolha, basta que ele seja copiado e adaptado para a aplicação atual, sem que o requisito seja criado "do zero".</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MoreInfo;
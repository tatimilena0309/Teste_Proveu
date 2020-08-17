import React from 'react'
import './Card.css'

export default props =>
    <div className="Card">
        <div classname="Conteudo">
            {props.children}
        </div>
        <div className="Footer">
            {props.titulo}
        </div>
    </div>
import React from 'react'
import './Button.css'

export default props => 
    <button 
    onClick={e => props.clickEvent && props.clickEvent(props.label)}
    className={`
        btn 
        ${props.operation ? 'operation': ''}
        ${props.double ? 'double': ''}
        ${props.triple ? 'triple': ''}
    `}>
        {props.label}
    </button>
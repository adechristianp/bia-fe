import React from 'react';
import './button.css';

export const DefaultButton = ({disabled = false, onClick, label}) => {
  return (
    <button className='defaultButton' style={{opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer'}} onClick={onClick} disabled={disabled}>{label}</button>
  )
}

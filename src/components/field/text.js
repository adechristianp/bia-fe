import React, { useRef } from 'react';
import './field.css';

export const TextField = ({fieldId, label, value, onChange, disabled}) => {
  const inputRef = useRef(null);
  return (
    <div className='inputContainer' onClick={()=>{inputRef?.current?.focus();}}>
        <div className='label'>{label}</div>
        <input disabled={disabled} ref={inputRef} onChange={(e) => onChange(fieldId, e.target.value)} type="text" value={value} />
    </div>
  )
}
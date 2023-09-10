import React, { useRef } from 'react';
import './field.css';

export const DateField = ({label, onChange, value, disabled, fieldId}) => {
  const dateRef = useRef(null);
  return (
    <div className='inputContainer' onClick={()=> !disabled && dateRef?.current?.showPicker()}>
        <div className='label'>{label}</div>
        <input ref={dateRef} type="date" value={value} onChange={(e) => onChange(fieldId, e.target.value)} disabled={disabled} />
    </div>
  )
}

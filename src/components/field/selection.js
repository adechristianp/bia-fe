import React from 'react';
import './field.css';

export const SelectionField = ({
    label,
    options,
    value,
    onChange,
    disabled,
    fieldId
}) => {
  return (
    <div>
        <div className="inputContainer">
            <div className="label">{label}</div>
            {options.map((data, idx)=> {
                return(
                    <div key={idx} className='label' style={{cursor:'pointer'}} onClick={()=>!disabled && onChange(fieldId, data.id)} >
                    <input type="radio" onChange={()=>{}} checked={value===data.id} name="radio" disabled={disabled} />
                        {data.label}
                    </div>
                )
            })}
        </div>
    </div>
  )
}

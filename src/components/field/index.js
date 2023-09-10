import React, { useRef } from 'react';
import './field.css';
import { TextField } from './text';
import { SelectionField } from './selection';
import { DateField } from './date';

export const Field = (props) => {
  switch (props.fieldType) {
    case "text":
      return <TextField {...props} />
    case "selection":
      return <SelectionField {...props} />
    case "date":
      return <DateField {...props} />
  
    default:
      return <TextField {...props} />
  }
}
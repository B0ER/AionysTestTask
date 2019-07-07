import React from 'react';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

export function TimeField({ controlId, label, initialValue, value, onChange, ...props }) {
  return (
    <FormGroup controlId={controlId}>
      <ControlLabel>{label}</ControlLabel>
      <TimePicker
        format={24}
        step={30}
        initialValue={initialValue}
        start="07:00"
        end="22:00"
        value={value}
        onChange={onChange} />
    </FormGroup>
  );
}
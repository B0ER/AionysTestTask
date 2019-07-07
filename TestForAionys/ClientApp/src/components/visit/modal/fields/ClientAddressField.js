import React from 'react';
import { Field } from './Field';

export function validateAddress(address) {
  const length = address.length;
  if (length > 5) return 'success';
  else if (length > 0) return 'error';
  return null;
}

export function ClientAddressField({ value, onChange, ...props }) {
  return (
    <Field
      id="ClientAddressControl"
      label="Адрес"
      validation={validateAddress(value)}

      type="text"
      value={value}
      placeholder="Введите адрес"
      onChange={onChange}
    />
  );
}
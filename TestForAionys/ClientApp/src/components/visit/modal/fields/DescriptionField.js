import React from 'react';
import { Field } from './Field';

export function validateDescription(description) {
  const length = description.length;
  if (length > 5) return 'success';
  else if (length > 0) return 'error';
  return null;
}

export function DescriptionField({ value, onChange, ...props }) {
  return (
    <Field
      id="DescriptionControl"
      label="Описание"
      validation={validateDescription(value)}

      type="textarea"
      value={value}
      placeholder="Введите описание"
      onChange={onChange}
    />
  );
}
import React from 'react';
import { Field } from './Field';

export function validateName(taskName) {
  const length = taskName.length;
  if (length > 5) return 'success';
  else if (length > 0) return 'error';
  return null;
}

export function NameField({ value, onChange, ...props }) {
  return (
    <Field
      id="TaskNameControl"
      label="Название задания"
      validation={validateName(value)}

      type="text"
      value={value}
      placeholder="Введите название"
      onChange={onChange}
    />
  );
}
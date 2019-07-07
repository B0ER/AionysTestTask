import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export function validateClientId(clientId){
  if (clientId === "null") return 'error';
  if (clientId !== null && clientId !== '') return 'success';
  return null;
}

export function ClientIdField({ onChange, value, clients, ...props }) {
  return (
    <FormGroup controlId="ClientIdControl" validationState={validateClientId(value)}>
      <ControlLabel>Клиент</ControlLabel>
      <FormControl componentClass="select" onChange={onChange}>
        <option value="null">Выбрать</option>
        {clients.map(client => {
          return (
            <option key={client.id} value={client.id}>{client.firstName} {client.lastName}</option>
          );
        })}
      </FormControl>
    </FormGroup>
  );
}
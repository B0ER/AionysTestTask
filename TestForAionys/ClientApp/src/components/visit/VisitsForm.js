import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import { Fetcher } from '../../apiFetcher/Fetcher';

export class VisitsForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.fetcher = new Fetcher();

    this.state = {
      taskName: "",
      description: "",
      clientId: "",
      address: "",
      startTime: "",
      endTime: "",

      value: '',
      clients: []
    };
  }

  validateName() {
    const length = this.state.taskName.length;
    if (length > 5) return 'success';
    else if (length > 0) return 'error';
    return null;
  }

  validateDescription() {
    const length = this.state.description.length;
    if (length > 5) return 'success';
    else if (length > 0) return 'error';
    return null;
  }

  validateAddress() {
    const length = this.state.address.length;
    if (length > 5) return 'success';
    else if (length > 0) return 'error';
    return null;
  }


  render() {
    return (
      <form>
        <FormField
          id="TaskNameControl"
          label="Название задания"
          validation={this.validateName()}

          type="text"
          value={this.state.taskName}
          placeholder="Введите название"
          onChange={(e) => { this.setState({ taskName: e.target.value }) }}
        />

        <FormGroup
          controlId="DescriptionControl"
          validationState={this.validateDescription()}>
          <ControlLabel>Описание</ControlLabel>
          <FormControl componentClass="textarea"
            placeholder="Введите описание"
            value={this.state.description}
            onChange={(e) => { this.setState({ description: e.target.value }) }}
          />
        </FormGroup>

        <RenderSelectList controlId="ClientIdControl"
          clients={this.state.clients}
          onChange={(e) => { this.setState({ clientId: e.target.value }) }}
        />

        <FormField
          id="ClientAddressControl"
          label="Адрес"
          validation={this.validateAddress()}

          type="text"
          value={this.state.address}
          placeholder="Введите адрес"
          onChange={(e) => { this.setState({ address: e.target.value }) }}
        />

        <FormGroup controlId="StartTimeControl">
          <ControlLabel>Начало в</ControlLabel>
          <TimePicker
            format={24}
            step={30}
            value={this.state.startTime}
            onChange={(time) => { this.setState({ startTime: time }) }} />
        </FormGroup>

        <FormGroup controlId="EndTimeControl">
          <ControlLabel>Конец в</ControlLabel>
          <TimePicker
            format={24}
            step={30}
            value={this.state.endTime}
            onChange={(time) => { this.setState({ endTime: time }) }} />
        </FormGroup>

        <Button bsStyle="primary" type="submit">Добавить</Button>
      </form>
    );
  }
}

function RenderSelectList({ controlId, clients, ...props }) {
  return (
    <FormGroup controlId="ClientIdControl">
      <ControlLabel>Клиент</ControlLabel>
      <FormControl componentClass="select">
        <option>Выбрать</option>
        {clients.map(client => {
          return (
            <option key={client.Id} value={client.Id}>{client.FirstName} {client.LastName}</option>
          );
        })}
      </FormControl>
    </FormGroup>
  );
}

function FormField({ id, label, validation, help, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validation}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  );
}
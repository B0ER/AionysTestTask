import React, { Component } from 'react';
import { AppModal } from '../../common/Modal';
import { Fetcher } from '../../../apiFetcher/Fetcher';

import * as Fields from './fields';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class VisitsModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.validationField = this.validationField.bind(this);
    this.addVisit = this.addVisit.bind(this);

    this.fetcher = new Fetcher();

    this.state = {
      taskName: "",
      description: "",
      clientId: "",
      clientAddress: "",
      startTime: 25200,
      endTime: 79200,

      clients: []
    };

    this.fetcher.getAll('clients')
      .then(clients => this.setState({ clients }));
  }


  validationField() {
    let nameIsValid = Fields.validateName(this.state.taskName);
    if ("error" === nameIsValid || null === nameIsValid) {
      toast("Введите корректное имя", { type: toast.TYPE.ERROR, autoClose: 5000 });
      return false;
    }

    let descriptionIsValid = Fields.validateDescription(this.state.description)
    if ("error" === descriptionIsValid || null === descriptionIsValid) {
      toast("Введите корректное описание", { type: toast.TYPE.ERROR, autoClose: 5000 });
      return false;
    }

    let clientIdIsValid = Fields.validateClientId(this.state.clientId);
    if ("error" === clientIdIsValid || null === clientIdIsValid) {
      toast("Выберите клиента", { type: toast.TYPE.ERROR, autoClose: 5000 });
      return false;
    }

    let addressIsValid = Fields.validateAddress(this.state.clientAddress);
    if ("error" === addressIsValid || null === addressIsValid) {
      toast("Введите корректный адрес", { type: toast.TYPE.ERROR, autoClose: 5000 });
      return false;
    }
    return true;
  }

  addVisit = () => {
    let fieldIsValid = this.validationField();

    if (fieldIsValid) {
      let newVisit = {
        taskName: this.state.taskName,
        description: this.state.description,
        clientId: this.state.clientId,
        clientAddress: this.state.clientAddress,
        startTime: this.state.startTime,
        endTime: this.state.endTime
      };


      this.fetcher.insert('visits', newVisit)
        .then((requestVisit) => {
          this.props.addToTable(requestVisit);
        });

      /*
      let requestVisit = {
        id: "abc",
        taskName: "Имя",
        description: "Фамилия",
        clientAddress: "Фамилия",
        startTime: "08:00",
        endTime: "22:00",
        clientFirstName: "Сидор",
        clientLastName: "Петр",
      }
      this.props.addToTable(requestVisit);
      */
      this.closeModal();
    }
  }

  closeModal = () => {
    this.setState({
      taskName: "",
      description: "",
      clientId: "",
      clientAddress: "",
      startTime: "",
      endTime: ""
    });
    this.appModal.closeModal();
  }

  render() {
    return (
      <div>
        <AppModal
          onRef={ref => { this.appModal = ref; this.props.onRef(ref); }}
          HeadText="Добавить"
          submitAction={this.addVisit}
          submitButtonText="Добавить"
          cancelButtonText="Закрыть"
          onCancelClick={() => this.closeModal()}
        >
          <form>
            <Fields.NameField
              value={this.state.taskName}
              onChange={(e) => { this.setState({ taskName: e.target.value }) }} />

            <Fields.DescriptionField
              value={this.state.description}
              onChange={(e) => { this.setState({ description: e.target.value }) }}
            />

            <Fields.ClientIdField
              value={this.state.clientId}
              clients={this.state.clients}
              onChange={(e) => { this.setState({ clientId: e.target.value }) }}
            />

            <Fields.ClientAddressField
              value={this.state.clientAddress}
              onChange={(e) => { this.setState({ clientAddress: e.target.value }) }}
            />

            <Fields.TimeField
              controlId="StartTimeControl"
              label="Начало в"
              initialValue="HH?(:mm?(:ss?))"
              value={this.state.startTime}
              onChange={(time) => { this.setState({ startTime: time }) }}
            />

            <Fields.TimeField
              controlId="EndTimeControl"
              label="Конец в"
              value={this.state.endTime}
              onChange={(time) => { this.setState({ endTime: time }) }}
            />
          </form>
        </AppModal>
        <ToastContainer />
      </div>
    );
  }
}
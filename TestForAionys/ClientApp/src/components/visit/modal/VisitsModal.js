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

    this.fetcher = new Fetcher();

    this.state = {
      taskName: "",
      description: "",
      clientId: "",
      clientAddress: "",
      startTime: 25200,
      endTime: 79200,

      clients: [],
      submitTextButton: "Добавить"
    };

    this.fetcher.getAll('clients')
      .then(clients => this.setState({ clients }));
  }

  validationField({ taskName, description, clientId, clientAddress }) {
    let nameIsValid = Fields.validateName(taskName);
    if ("error" === nameIsValid || null === nameIsValid) {
      toast("Введите корректное имя", { type: toast.TYPE.ERROR, autoClose: 5000 });
      return false;
    }

    let descriptionIsValid = Fields.validateDescription(description)
    if ("error" === descriptionIsValid || null === descriptionIsValid) {
      toast("Введите корректное описание", { type: toast.TYPE.ERROR, autoClose: 5000 });
      return false;
    }

    let clientIdIsValid = Fields.validateClientId(clientId);
    if ("error" === clientIdIsValid || null === clientIdIsValid) {
      toast("Выберите клиента", { type: toast.TYPE.ERROR, autoClose: 5000 });
      return false;
    }

    let addressIsValid = Fields.validateAddress(clientAddress);
    if ("error" === addressIsValid || null === addressIsValid) {
      toast("Введите корректный адрес", { type: toast.TYPE.ERROR, autoClose: 5000 });
      return false;
    }
    return true;
  }

  showModal(action) {
    switch (action) {
      case 'update':
        this.setState({ submitTextButton: 'Обновить' });
        this.apiAction = (updateVisit) => {
          this.fetcher.update('visits', updateVisit.Id, updateVisit)
            .then((requestVisit) => {
              this.props.updateTable();
            });
        };
        break;

      case 'insert':
        this.setState({ submitTextButton: 'Добавить' });
        this.apiAction = (newVisit) => {
          this.fetcher.insert('visits', newVisit)
            .then((requestVisit) => {
              this.props.updateTable(requestVisit);
            });
        };
        break;

      default:
        throw new Error();
    }
    this.appModal.showModal();
  }

  timeConvertToSec(hm) {
    var a = hm.split(':');
    return (+a[0]) * 3600 + (+a[1]);
  }

  setModalData = (visit) => {
    this.setState({
      id: visit.id,
      taskName: visit.taskName,
      description: visit.description,
      clientId: visit.clientId,
      clientAddress: visit.clientAddress,
      startTime: this.timeConvertToSec(visit.startTime),
      endTime: this.timeConvertToSec(visit.endTime)
    });
  }

  submitAction = () => {
    let fieldIsValid = this.validationField(this.state);

    if (fieldIsValid) {
      let newVisit = {
        Id: this.state.id,
        TaskName: this.state.taskName,
        Description: this.state.description,
        ClientId: this.state.clientId,
        ClientAddress: this.state.clientAddress,
        StartTime: this.state.startTime,
        EndTime: this.state.endTime
      };

      this.apiAction(newVisit);
      this.closeModal();
    }
  }

  closeModal = () => {
    this.appModal.closeModal();
    this.setState({
      taskName: "",
      description: "",
      clientId: "",
      clientAddress: "",
      startTime: 25200,
      endTime: 79200
    });
  }

  render() {
    return (
      <div>
        <AppModal
          onRef={refModal => { this.appModal = refModal; this.props.onRef(this); }}
          HeadText="Добавить"
          submitButtonText={this.state.submitTextButton}
          cancelButtonText="Закрыть"
          onCancelClick={() => this.closeModal()}
          onSubmitClick={this.submitAction}
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
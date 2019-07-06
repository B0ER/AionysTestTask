import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { AppModal } from '../Modal';
import { Fetcher } from '../../apiFetcher/Fetcher';
import { VisitsForm } from './VisitsForm';

export class Visits extends Component {
  displayName = Visits.name

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
    let fetcher = new Fetcher();

    fetcher.getAll('visits')
      .then(data => {
        this.setState({ Visits: data, loading: false });
      });
  }

  static renderVisitsTable(visits) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Адрес</th>
            <th>Начало</th>
            <th>Конец</th>
            <th>Имя клиента</th>
            <th>Фамилия клиента</th>
          </tr>
        </thead>
        <tbody>
          {visits.map(visitor =>
            <tr key={visitor.TaskName}>
              <td>{visitor.Description}</td>
              <td>{visitor.ClientAddress}</td>
              <td>{visitor.StartTime}</td>
              <td>{visitor.EndTime}</td>
              <td>{visitor.ClientFirstName}</td>
              <td>{visitor.ClientLastName}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Загрузка...</em></p>
      : Visits.renderVisitsTable(this.state.Visits);

    return (
      <div>
        <h3>Визиты</h3>
        <Button bsStyle="primary" onClick={() => this.appModal.showModal()}>Добавить</Button>
        <AppModal onRef={ref => { this.appModal = ref; }} HeadText="Добавить" isShow={this.state.isShowModal}>
          <VisitsForm/>
        </AppModal>
        {contents}
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Fetcher } from '../../apiFetcher/Fetcher';
import { VisitsModal } from './modal/VisitsModal';

export class Visits extends Component {
  displayName = Visits.name

  constructor(props) {
    super(props);
    this.state = { visits: [], loading: true };
    let fetcher = new Fetcher();

    fetcher.getAll('visits')
      .then(data => {
        this.setState({ visits: data, loading: false });
      });
  }

  addToTable = (visit) => {
    this.setState((state) => {
      let visits = state.visits;
      visits.push(visit);
      return { visits };
    });
  }

  static renderDataTable(visits) {
    return (
      <tbody>
        {visits.map(visitor =>
          <tr key={visitor.id}>
            <td>{visitor.taskName}</td>
            <td>{visitor.description}</td>
            <td>{visitor.clientAddress}</td>
            <td>{visitor.startTime}</td>
            <td>{visitor.endTime}</td>
            <td>{visitor.clientFirstName}</td>
            <td>{visitor.clientLastName}</td>
          </tr>
        )}
      </tbody>
    );
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
            <th>Фамилия клиента</th>
            <th>Имя клиента</th>
          </tr>
        </thead>
        {Visits.renderDataTable(visits)}
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Загрузка...</em></p>
      : Visits.renderVisitsTable(this.state.visits);

    return (
      <div>
        <h3>Визиты</h3>
        <Button bsStyle="primary" onClick={() => this.appModal.showModal()}>Добавить</Button>
        <VisitsModal
          onRef={ref => { this.appModal = ref; }}
          addToTable={this.addToTable}
        />
        {contents}
      </div>
    );
  }
}

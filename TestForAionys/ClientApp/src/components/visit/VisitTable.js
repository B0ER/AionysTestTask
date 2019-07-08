import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { Fetcher } from '../../apiFetcher/Fetcher';


export class VisitTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.fetcher = new Fetcher();
    this.state = { visits: [], loading: true };

    this.fetcher.getAll('visits')
      .then(data => {
        this.setState({ visits: data, loading: false });
      });
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }


  addToTable = (visit) => {
    this.setState((state) => {
      let visits = state.visits;
      visits.push(visit);
      return { visits };
    });
  }

  updateTable = () => {
    this.fetcher.getAll('visits')
      .then(data => {
        this.setState({ visits: data, loading: false });
      });
  }

  deleteFromTable = (visitId) => {
    this.setState((state) => {
      let visits = state.visits.filter(visit => visit.id !== visitId);
      return { visits };
    });
  }

  deleteButtonAction = (visit) => {
    return (event) => {
      this.fetcher.delete('visits', visit.id);
      this.deleteFromTable(visit.id);
    }
  }


  renderDataTable() {
    return (
      this.state.visits.map(visit =>
        <tr key={visit.id}>
          <td>{visit.taskName}</td>
          <td>{visit.description}</td>
          <td>{visit.clientAddress}</td>
          <td>{visit.startTime}</td>
          <td>{visit.endTime}</td>
          <td>{visit.clientFirstName}</td>
          <td>{visit.clientLastName}</td>
          <td>
            <Button bsStyle="primary" className="action-button" onClick={this.props.updateButtonAction(visit)}>
              <Glyphicon glyph='pencil'> Изменить</Glyphicon>
            </Button>
            <Button bsStyle="primary" onClick={this.deleteButtonAction(visit)}>
              <Glyphicon glyph='remove'> Удалить</Glyphicon>
            </Button>
          </td>
        </tr>)
    );
  }

  renderTable() {
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
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {this.renderDataTable()}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Загрузка...</em></p>
      : this.renderTable();

    return contents;
  }
}
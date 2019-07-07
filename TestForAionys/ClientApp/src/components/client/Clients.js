import React, { Component } from 'react';
import { Fetcher } from '../../apiFetcher/Fetcher';

export class Clients extends Component {
  displayName = Clients.name

  constructor(props) {
    super(props);
    this.state = { clients: [], loading: true, isShowModal: false };
    this.fetcher = new Fetcher();

    this.fetcher.getAll('clients')
      .then(data => {
        this.setState({ clients: data, loading: false });
      });
  }

  static renderClientsTable(clients) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Адрес</th>
            <th>Номер тел.</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client =>
            <tr key={client.id}>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.address}</td>
              <td>{client.phoneNumbers}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Загрузка...</em></p>
      : Clients.renderClientsTable(this.state.clients);

    return (
      <div>
        <h3>Клиенты</h3>
        {contents}
      </div>
    );
  }
}

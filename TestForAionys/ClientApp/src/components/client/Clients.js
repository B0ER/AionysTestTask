import React, { Component } from 'react';
import { Fetcher } from '../../apiFetcher/Fetcher';
import { ClientsDropDown } from './ClientsDropDown';
import { ButtonToolbar } from 'react-bootstrap';

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

  renderClientsTable(clients) {
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

  renderDropDown(clientsArr) {
    return (
      <ButtonToolbar>
        <ClientsDropDown
          title="Город"
          dataSelector="address"
          downloadMenuItems={this.fetcher.getAllCity}
          updateData={(clients) => this.setState({ clients })}
          data={clientsArr}
        />
        <ClientsDropDown
          title="Фамилия"
          dataSelector="firstName"
          downloadMenuItems={this.fetcher.getAllFirstName}
          updateData={(clients) => this.setState({ clients })}
          data={clientsArr}
        />
      </ButtonToolbar>
    );
  }

  render() {
    return (
      <div>
        <h3>Клиенты</h3>

        {!this.state.loading && this.renderDropDown(this.state.clients)}
        {!this.state.loading && this.renderClientsTable(this.state.clients)}

      </div>
    );
  }
}

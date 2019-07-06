import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Clients } from './components/client/Clients';
import { Visits } from './components/visit/Visits';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Clients} />
        <Route path='/clients' component={Clients} />
        <Route path='/visits' component={Visits} />
      </Layout>
    );
  }
}

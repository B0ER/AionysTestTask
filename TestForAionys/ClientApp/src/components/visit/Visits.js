import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Fetcher } from '../../apiFetcher/Fetcher';
import { VisitsModal } from './modal/VisitsModal';
import { VisitTable } from './VisitTable';

import './Visits.css';


export class Visits extends Component {
  displayName = Visits.name

  constructor(props) {
    super(props);
    this.state = { visits: [], loading: true };
    this.fetcher = new Fetcher();
  }

  updateButtonAction = (visit) => {
    return (event) => {
      this.visitModal.setModalData(visit);
      this.visitModal.showModal('update');
    }
  }

  render() {
    return (
      <div>
        <h3>Визиты</h3>
        <Button bsStyle="primary" onClick={() => this.visitModal.showModal('insert')}>Добавить</Button>
        <VisitsModal
          onRef={refVisitModal => { this.visitModal = refVisitModal; }}
          addToTable={(visit) => this.visitTable.addToTable(visit)}
          updateTable={() => { this.visitTable.updateTable(); }}
        />
        <VisitTable
          onRef={refTable => this.visitTable = refTable}
          visits={this.state.visits}
          updateButtonAction={this.updateButtonAction}
        />
      </div>
    );
  }
}

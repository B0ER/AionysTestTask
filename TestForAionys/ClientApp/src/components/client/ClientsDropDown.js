import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';


export class ClientsDropDown extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { menuItems: [], data: this.props.data };
    this.props.downloadMenuItems()
      .then((menuItems) => this.setState({ menuItems: menuItems }));
  }

  filterClients = (eventKey, event) => {
    let dataForShow = this.state.data.filter(item => item[this.props.dataSelector] == eventKey);
    this.props.updateData(dataForShow);
  }

  render() {
    return (
      <DropdownButton
        bsStyle="primary"
        title={this.props.title}
        key={this.props.title}
        id={`dropdown-basic`}
      >
        {
          this.state.menuItems.map((menuItem, index) => {
            return (
              <MenuItem
                eventKey={menuItem}
                key={index}
                onSelect={(eventKey, event) => this.filterClients(eventKey, event)}
              >
                {menuItem}
              </MenuItem>
            );
          })
        }
      </DropdownButton>
    );
  }
}
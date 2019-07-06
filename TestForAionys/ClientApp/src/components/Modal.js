import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class AppModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { modalIsShow: props.isShow };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  showModal() {
    this.setState({ modalIsShow: true });
  }

  closeModal() {
    this.setState({ modalIsShow: false });
  }

  render() {
    return (
      <Modal show={this.state.modalIsShow} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.HeadText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.closeModal}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
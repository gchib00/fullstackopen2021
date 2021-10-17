import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddNewEntryForm from './AddNewEntryForm';
import { HealthCheckEntry } from '../types'

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<HealthCheckEntry, 'id'>) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddNewEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddPatientModal;
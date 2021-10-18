import React, { useState } from 'react';
import { Modal, Segment, Select } from 'semantic-ui-react';
import AddNewEntryForm from './AddNewEntryForm';
import { AcceptableEntries } from '../types'

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AcceptableEntries) => void;
  error?: string;
}

const typeOptions = [
  {value: 'HealthCheck', text: 'Health check'},
  {value: 'Hospital', text: 'Hospital check'},
  {value: 'OccupationalHealthcare', text: 'Occupational check'}
]

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [type, setType] = useState<string>('Hospital');
  const optionChange = (e: any, data: any) => {
    setType(data.value);
  }

  return(
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new patient</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Select placeholder='Select type:' options={typeOptions} defaultValue={type} style={{marginBottom: 20}} onChange={optionChange}/>
        <AddNewEntryForm onSubmit={onSubmit} onCancel={onClose} type={type} />
      </Modal.Content>
    </Modal>
  )
  };

export default AddPatientModal;
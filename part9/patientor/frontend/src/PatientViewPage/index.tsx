import React, { useEffect, useState } from "react";
import { Patient, BaseEntry, Diagnosis, AcceptableEntries } from "../types";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import Entries from '../components/Entries';
import AddPatientModal from '../AddNewEntryModal'
import axios from "axios";
import { Icon, Button } from 'semantic-ui-react';

const PatientListPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosesArr, setDiagnosesArr] = useState<Diagnosis[]>([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { id } = useParams<{id: string}>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: AcceptableEntries) => {
    values = {...values};
    try {
      const { data } = await axios.post(
        `${apiBaseUrl}/api/patients/${id}/entries`,
        values
      );
      closeModal();
    } catch (err) {    
      //@ts-ignore  
      console.error(err.response?.data || 'Unknown Error');      
    }
  };

  const fetchFullPatient = async () => {
    const response = await axios.get<Patient>( `${apiBaseUrl}/api/patients/${id}`);
    const data: Patient = response.data;
    setPatient(data);
    fetchDiagnoses();
  }
  const fetchDiagnoses = async () => {
    const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/api/diagnoses`);
    setDiagnosesArr(response.data);
  }
  useEffect(() => {
    fetchFullPatient();
  }, [])

  if (!patient) {
    return(<h2>Patient not found!</h2>)
  }

  const getGenderIcon = () => {
    if(patient.gender === 'female'){
      return 'venus';
    } else {
      return 'mars';
    }
  }

  const entriesArr: BaseEntry[] = patient.entries;

  return(
    <div>
      <h2>{patient.name} <Icon name={getGenderIcon()}/></h2>
      <p><strong>SSN:</strong> {patient.ssn}</p>
      <p><strong>Occupation:</strong> {patient.occupation}</p>
      <br />
      <Entries entries={entriesArr} diagnoses={diagnosesArr} />
      <AddPatientModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add a new entry</Button>
    </div>
  )
};

export default PatientListPage;
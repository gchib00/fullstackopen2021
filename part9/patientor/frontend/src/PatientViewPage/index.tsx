import React, { useEffect, useState } from "react";
import { Patient, BaseEntry, Diagnosis } from "../types";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import Entries from '../components/Entries';
import axios from "axios";
import { Icon } from 'semantic-ui-react';

const PatientListPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosesArr, setDiagnosesArr] = useState<Diagnosis[]>([]);
  const { id } = useParams<{id: string}>();

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
    </div>
  )
};

export default PatientListPage;
import React, { useEffect, useState } from "react";
import { Patient } from "../types";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Icon } from 'semantic-ui-react';

const PatientListPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams<{id: string}>();

  const fetchFullPatient = async () => {
    const response = await axios.get<Patient>( `${apiBaseUrl}/api/patients/${id}`);
    const data: Patient = response.data;
    setPatient(data);
  }
  useEffect(() => {
    fetchFullPatient();
  }, [])

  if (!patient) {
    return(<h2>Patient not found!</h2>)
  }

  const getGenderIcon = () => {
    console.log('called')
    if(patient.gender === 'female'){
      return 'venus';
    } else {
      return 'mars';
    }
  }
  return(
    <div>
      <h2>{patient.name} <Icon name={getGenderIcon()}/></h2>
      <p><strong>SSN:</strong> {patient.ssn}</p>
      <p><strong>Occupation:</strong> {patient.occupation}</p>
    </div>
  )
};

export default PatientListPage;
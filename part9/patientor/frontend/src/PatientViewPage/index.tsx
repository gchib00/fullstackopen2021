import React, { useEffect, useState } from "react";
import { Patient, BaseEntry } from "../types";
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
    if(patient.gender === 'female'){
      return 'venus';
    } else {
      return 'mars';
    }
  }
  const entriesArr: BaseEntry[] = patient.entries;
  console.log(entriesArr)
  return(
    <div>
      <h2>{patient.name} <Icon name={getGenderIcon()}/></h2>
      <p><strong>SSN:</strong> {patient.ssn}</p>
      <p><strong>Occupation:</strong> {patient.occupation}</p>
      <br />
      <h3>Entries:</h3>
        {entriesArr.map(entry => {
          if(entry.diagnosisCodes === undefined){
            return(
              <p>{entry.description}</p>
            )
          }
          return(
            <div>
              <p>{entry.description}</p>
              <ul>
                {entry.diagnosisCodes.map(code => {
                  return(
                    <li>{code}</li>
                  )
                })}
              </ul>
            </div>
          )
        })}
        {/* <p>{entriesArr.}</p> */}
    </div>
  )
};

export default PatientListPage;
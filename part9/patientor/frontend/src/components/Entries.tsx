import {  BaseEntry, Diagnosis } from "../types";
import { Icon } from 'semantic-ui-react';

interface ComponentProps {
  entries: BaseEntry[];
  diagnoses: Diagnosis[]
}
interface EntryCardProps {
  entry: BaseEntry
}

const EntryCard = ({entry}: EntryCardProps) => {
  const getIcon = () => {
  switch(entry.type) {
    case('HealthCheck'): {
      return <Icon name='calendar check' />
    }
    case('OccupationalHealthcare'): {
      return <Icon name='medkit' />
      break;
    }
    case('Hospital'): {
      return <Icon name='hospital' />
    }
    default: null;
  }
  }
  return(
    <div>
      <div className='ui card' style={{margin: 15}}>
      <div className="content">
        <div className="header" style={{display:'flex', justifyContent:'space-between'}}>
          {entry.date} {getIcon()}
        </div>
        <div className="description">
          <p>{entry.description}</p>
        </div>
      </div>  
    </div>
    </div>
  )
}

const Entries = ({entries, diagnoses}: ComponentProps) => {

  const determineDiagnoses =  (code: string) => {
    const response: Diagnosis | undefined = diagnoses.find(diagnosis => diagnosis.code == code);
    if (!response){return null}
    return response.name;
  }

  return(
  <section>
    <h3>Entries:</h3>
    {entries.map(entry => {
      return(<EntryCard entry={entry} key={entry.date}/>)
    })}


  {/* {entries.map(entry => {
        if(!entry.diagnosisCodes){
          return(<p key={entry.id}>{entry.description}</p>)
        }
        return(
          <div key={entry.id}>
            <p>{entry.description}</p>
            <ul>
              {
                entry.diagnosisCodes.map(code => {
                  const test = determineDiagnoses(code);
                  if(typeof test === 'string'){return(<li key={code}>{code} - {test}</li>)}
                  return(<li key={code}>{code}</li>)
                })
              }
            </ul>
          </div>
        )
    })}   */}
  </section>
  )
};

export default Entries;
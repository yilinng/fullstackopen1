import { Box, Button, SvgIcon } from "@mui/material";

import { useState } from "react";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import { Patient, Diagnosis, Entry, TypeCheck } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import WcIcon from '@mui/icons-material/Wc';
import { useParams } from 'react-router-dom'
import AddEntry from "../AddEntry";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case TypeCheck.Hospital:
      return <Hospital entry={entry} />
    case TypeCheck.OccupationalHealthcare:
      return <OccupationalHealthcare entry={entry}/>
    case TypeCheck.HealthCheck:
      return <HealthCheck entry={entry}/>  
  }
}

const PatientPage = ({ patients, diagnoses, setPatients }: Props) => {
  const id = useParams().id as string
  const patient = patients.find(n => n.id === id)
  const [showAdd, setShowAdd] = useState<boolean>(false)


  /*
  const findDiagnose = (code: string): Diagnosis | undefined => {
    return diagnoses.find(n => n.code === code)
  }
  */
  return (
    <div className="App">
      <Box>
        <h2> {patient?.name}
          <SvgIcon component={patient?.gender ==="male" ? MaleIcon : patient?.gender === 'female' ? FemaleIcon : WcIcon}/>
        </h2>

          <br />
          <p>ssn: {patient?.ssn}</p>
          <p>occupation: { patient?.occupation}</p>
        <br />

        <Button variant="contained" color="success" onClick={() => setShowAdd(true)} className="addEntryBtn">Add Entry</Button>

        {showAdd &&
          <AddEntry onCancel={() => setShowAdd(false)}
            diagnoses={diagnoses} id={id}
            patients={patients}
            setPatients={setPatients}
          />}
       
        <h3>entries</h3>
        {patient?.entries.map(entry => <div className="entryList" key={entry.id}>
          {<EntryDetails entry={entry} />}
          {/*}
          <ul>
            {entry.diagnosisCodes?.map((code, idx) => <li key={idx}>{code} {findDiagnose(code)?.name }</li>)}
          </ul>
          */}
        </div>)}
      </Box>


    </div>
  );
};

export default PatientPage;

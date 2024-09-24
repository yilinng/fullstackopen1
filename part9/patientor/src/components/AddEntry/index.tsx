import { useState } from 'react'
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm'
import AddHospitalEntryForm from './AddHospitalForm'
import AddOccupationalHealthcareEntryForm from './AddOccupationalHealthcareForm'
import { Diagnosis, EntryWithoutId, TypeCheck, Patient } from '../../types'
import { Select, MenuItem, SelectChangeEvent } from '@mui/material'
import axios from 'axios';
import patientService from "../../services/patients";

interface EntryDatailInterface {
  type: TypeCheck;
  onCancel: () => void;
  diagnoses: Diagnosis[];
  onSubmit: (entry: EntryWithoutId) => void;
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
}


const EntryDetails: React.FC<EntryDatailInterface> = ({ type, onCancel, diagnoses, onSubmit, error, setError }) => {
  switch (type) {
    case TypeCheck.Hospital:
      return <AddHospitalEntryForm onCancel={onCancel} diagnoses={diagnoses} onSubmit={onSubmit} error={error} setError={setError}/>
    case TypeCheck.OccupationalHealthcare:
      return <AddOccupationalHealthcareEntryForm onCancel={onCancel} diagnoses={diagnoses} onSubmit={onSubmit} error={error} setError={setError}/>
    case TypeCheck.HealthCheck:
      return <AddHealthCheckEntryForm onCancel={onCancel} diagnoses={diagnoses} onSubmit={onSubmit} error={error} setError={setError}/>  
  }
}

interface TypeCheckOption{
  value: TypeCheck;
  label: string;
}

const typeCheckOptions: TypeCheckOption[] = Object.values(TypeCheck).map(v => ({
  value: v, label: v.toString()
}));

interface Props {
  onCancel: () => void;
  diagnoses: Diagnosis[];
  id: string;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export default function AddEntry({onCancel, diagnoses, id, patients, setPatients}: Props) {

  const [selectType, setSelectType] = useState<TypeCheck>(TypeCheck.HealthCheck)
  const [error, setError] = useState<string | undefined>()


  const onSelectTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(TypeCheck).find(g => g.toString() === value);
      if (type) {
        setSelectType(type);
      }
    }
  };

  const submitNewEntry = async (entry:  EntryWithoutId) => {
    try {
      
      const newEntry = await patientService.addEntry(id, entry)
      const updatePatients = patients.map(item => {
        if (item.id === id) {
          return newEntry
        } else {
          return item
        }
      }) as Patient[]

      console.log('updatePatients', updatePatients)

      setPatients(updatePatients)
      onCancel()
  
      console.log('add entry success.', patients)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log('check e', e)
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
          console.log("Unrecognized axios error")
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  /*
  const findDiagnose = (code: string): Diagnosis | undefined => {
    return diagnoses.find(n => n.code === code)
  }
  */
  
  return (
    <div className='addEntry'>
      <div className='addEntry_title'>
        <h2>Add Entry</h2>
        <Select
          labelId="select_type"
          id="select_type"
          value={selectType}
          label="TypeCheck"
          onChange={onSelectTypeChange}
        >
          
          {typeCheckOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
            }</MenuItem>
          )}   
        </Select>
      </div>

      <EntryDetails type={selectType} onCancel={onCancel} diagnoses={diagnoses} onSubmit={submitNewEntry} error={error} setError={setError} />
    </div>
  )
}

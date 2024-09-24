import patientData from '../../data/patients'
import { PatientEntry, NewPatientEntry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid'
const id = uuid()

const patients: PatientEntry[] = patientData as PatientEntry[];

const getEntries = () => {
  return patients;
};

const addPatient = (entry: NewPatientEntry) => {
  
  const newpatientEntry = {
    id,
   ...entry
  } as PatientEntry

  patients.push(newpatientEntry)
  
  return newpatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};


const addEntry = (patient: PatientEntry, entry: EntryWithoutId) => {

  const newEntry = {
    id,
   ...entry
  }

  patient.entries.push(newEntry)

  return patient
  
};
  
export default {
  getEntries,
  addPatient,
  addEntry,
  findById
};
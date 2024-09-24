import diagnoseData from '../../data/diagnoses'
import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnoseData as DiagnoseEntry[]

const getEntries = () => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};
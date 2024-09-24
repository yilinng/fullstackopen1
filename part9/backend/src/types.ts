import { z } from 'zod';
import { entrySchema, newEntrySchema} from './utils/utils'

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}


export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum TypeCheck {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare"
}


export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface DisCharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}


export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: TypeCheck.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: TypeCheck.Hospital;
  discharge?: DisCharge
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: TypeCheck.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientEntry {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NewDiagnoseEntry = Omit<DiagnoseEntry, 'id'>;

export type NonSensitivePatient = Omit<PatientEntry, 'ssn' | 'entries'>;

//export type NewPatientEntry =  Omit<PatientEntry, 'id'>;
export type NewPatientEntry = z.infer<typeof newEntrySchema>

export type NewEntry = z.infer<typeof entrySchema>

export type CodeFromDiagnose = DiagnoseEntry['code']
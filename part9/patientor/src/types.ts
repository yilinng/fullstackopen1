export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

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

export const HealthCheckRatingEnum = {
  "Healthy": HealthCheckRating.Healthy,
  "LowRisk": HealthCheckRating.LowRisk,
  "HighRisk": HealthCheckRating.HighRisk,
  "CriticalRisk": HealthCheckRating.CriticalRisk
}


export enum TypeCheck {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare"
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
  diagnosisCodes?: Array<Diagnosis['code']>;
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

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
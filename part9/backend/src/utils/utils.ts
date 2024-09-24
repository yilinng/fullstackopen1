import {
  NewPatientEntry,
  Gender,
  HealthCheckRating,
  TypeCheck,
  DisCharge,
  SickLeave,
  CodeFromDiagnose,
  NewEntry,
} from "../types"
import { z } from 'zod';

/*
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parsGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};
*/
export const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));

export const sickLeaveSchema: z.ZodType<SickLeave> = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
})

export const disChargeSchema: z.ZodType<DisCharge> = z.object({
  date: z.string().date(),
  criteria: z.string()
})


export const codeSchema: z.ZodType<CodeFromDiagnose> = z.string()
//https://github.com/colinhacks/zod/discussions/1780
export const baseEntrySchema = z.object({
  id: z.string().optional(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
}) 

export const hospitalSchema = baseEntrySchema.extend({
  type: z.literal(TypeCheck.Hospital),
  diagnosisCodes: z.array(codeSchema).nullable(),
  discharge: disChargeSchema
})

//https://github.com/colinhacks/zod/discussions/2125
export const healthCheckSchema = baseEntrySchema.extend({
  type: z.literal(TypeCheck.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating, {
    errorMap: () => ({
      message: "please input number in 0 to 3."
    })
  })
})

export const occupationalHealthcareSchema = baseEntrySchema.extend({
  type: z.literal(TypeCheck.OccupationalHealthcare),
  diagnosisCodes: z.array(codeSchema).optional(),
  employerName: z.string(),
  sickLeave: sickLeaveSchema.optional()
})

export const entrySchema = z.discriminatedUnion('type', [
  healthCheckSchema,
  hospitalSchema,
  occupationalHealthcareSchema
])

console.log(
  "hospitalSchema",
  hospitalSchema.safeParse({
    type: TypeCheck.Hospital,
    id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
    date: '2015-01-02',
    specialist: 'MD House',
    description:
    "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
    diagnosisCodes: [],
    discharge: {
      date: '2015-01-02',
      criteria: "test criteria"
    }
  }).success
)

console.log(
  "occupationalHealthcareSchema",
  occupationalHealthcareSchema.safeParse({
    type: TypeCheck.OccupationalHealthcare,
    id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
    date: '2015-01-02',
    specialist: 'MD House',
    employerName: 'HyPD',
    description:
    "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
    diagnosisCodes: [],
    sickLeave: {
      startDate: '2019-08-05',
      endDate: '2019-08-28',
    }
  }).success
)

console.log(
  "healthCheckSchema",
  healthCheckSchema.safeParse({
    type: TypeCheck.HealthCheck,
    id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
    date: '2015-01-02',
    specialist: 'MD House',
    description:
    "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
    healthCheckRating: 1,
  }).success
)


console.log(
  "entrySchema",
  entrySchema.safeParse({
    type: TypeCheck.HealthCheck,
    id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
    date: '2015-01-02',
    specialist: 'MD House',
    description:
    "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
    healthCheckRating: 1,
  }).success
)

//https://github.com/colinhacks/zod/issues/3752
/*
export const entrySchema: z.ZodType<Entry> = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  type: z.nativeEnum(TypeCheck),
  diagnosisCodes: z.array(codeSchema).optional(),
  healthCheckRating: z.nativeEnum(HealthCheckRating).optional(),
  discharge: disChargeSchema.optional(),
  employerName: z.string().optional(),
  sickLeave: sickLeaveSchema.optional(),
})
*/

/*
https://dev.to/shaharke/zod-zero-to-hero-chapter-4-513c
https://rasitcolakel.medium.com/exploring-zod-a-comprehensive-guide-to-powerful-data-validation-in-javascript-typescript-2c4818b5646d
//https://stackoverflow.com/questions/75886482/check-zod-types-are-equivalent-to-a-typescript-interface 
*/

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema)
})  


export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
 return newEntrySchema.parse(object)
}


export const toEntry = (object: unknown): NewEntry => {
  return entrySchema.parse(object)
 }
 


/*
const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};
*/




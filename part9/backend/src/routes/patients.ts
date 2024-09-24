import express, { Request, Response, NextFunction }  from 'express';
import patientService from '../services/patientService';
import { newEntrySchema, entrySchema } from '../utils/utils'
import {EntryWithoutId, NewPatientEntry, PatientEntry } from '../types';
import { z } from 'zod';

const router = express.Router();


/*
const findPatientParser = (req: Request, res: Response, next: NextFunction) => { 
  try {
    const patient = patientService.findById(req.params.id);
    if (patient) {
      
      req.body = patient
      next()
    } else {
      res.status(404).json({error: "can not find patient."})
    }
  } catch (error: unknown) {
    console.log('error unknown', error)
    next(error);
  }
}
*/
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
}

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res) => {
  res.json(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
  }
});

router.post('/', newPatientParser,(req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    const addEntry = patientService.addPatient(req.body) as PatientEntry
    res.json(addEntry)
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    try {
      const newEntry = entrySchema.parse(req.body) as EntryWithoutId
      const addEntry = patientService.addEntry(patient, newEntry)
      res.json(addEntry)
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
      } else {
        res.status(400).send({ error: 'unknown error' });
      }
    }
  } else {
    res.sendStatus(404);
  }
 
});

router.use(errorMiddleware);

export default router;



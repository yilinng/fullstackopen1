import { useState, SyntheticEvent } from "react";
import AddDiagnosisCode from "./AddDiagnosisCode";
import { TextField, InputLabel, Grid, Button, Alert } from '@mui/material';
import { Diagnosis, EntryWithoutId, TypeCheck } from "../../types";
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
  onCancel: () => void;
  diagnoses: Diagnosis[];
  onSubmit: (entry: EntryWithoutId) => void;
  error: string | undefined;
  setError:React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function AddOccupationalHealthcareEntryForm({onCancel, diagnoses, onSubmit, error, setError}: Props) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    setError(undefined)

    
    if (description === '') {
      setError('description cannot be empty!!')
      return
    }

    if (specialist === '') {
      setError('specialist cannot be empty!!')
      return
    }

    if (employerName === '') {
      setError('employerName cannot be empty!!')
      return
    }

    if (date === null) {
      setError('date cannot be empty!!');
      return
    }

    if (startDate === null) {
      setError('startDate cannot be empty!!');
      return
    }

    if (endDate === null) {
      setError('endDate cannot be empty!!');
      return
    }


    onSubmit({
      type: TypeCheck.OccupationalHealthcare,
      description,
      specialist,
      date: date.format('YYYY-MM-DD'),
      diagnosisCodes,
      employerName,
      sickLeave: {
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD')
      }
    });
    
    setDescription('')
    setDate(null)
    setSpecialist('')
    setEmployerName('')
    setDiagnosisCodes([])
    setStartDate(null)
    setEndDate(null)
 
  };

  const handleDiagnosis = (value: string) => {
    console.log('handleDiagnosis', value)
   // if(value === '') return setError('selected something!!')
    setModalOpen(false);
    //remove-empty-elements-from-an-array
    //const filtered = diagnosisCodes.filter(item => item)
    //console.log('filtered', filtered)
    //setDiagnosisCodes([...filtered])

    if (!diagnosisCodes.includes(value)) {
      setDiagnosisCodes([...diagnosisCodes, value])      
    } else {
      console.log('is selected!!', value)
    }
  }

  const handleFilter = (code: string) => {
    console.log('handleFilter', code)
    if (confirm(`do you want to delete  ${code} ?`)) {
      const filtered = diagnosisCodes.filter(item => item !== code)
      setDiagnosisCodes([...filtered])
    }
      
  }


  return (
    <div>
      {error !== '' && error !== undefined &&  <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry} className="entry_form">
        <TextField
          label="description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
    
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={date} onChange={(newValue) => setDate(newValue)} />
            </DemoContainer>
        </LocalizationProvider>

        <AddDiagnosisCode
          modalOpen={modalOpen}
          onSubmit={handleDiagnosis}
          onClose={closeModal}
          diagnoses={diagnoses}
        />
      
      <Button variant="contained" onClick={() => openModal()}>
        Add New Diagnosis
      </Button>
        
        <div className="diagnosisList">
          {diagnosisCodes.map(item => 
          <Button variant="outlined" key={item} type="button" className="codeBtn" onClick={() => handleFilter(item)}>
              {item}
          </Button>)}

        </div>

        <TextField
          label="employerName"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>sickLeave</InputLabel>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={startDate} onChange={(newValue) => setStartDate(newValue)} />
            </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={endDate} onChange={(newValue) => setEndDate(newValue)} />
            </DemoContainer>
        </LocalizationProvider>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

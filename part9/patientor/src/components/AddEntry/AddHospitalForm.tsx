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

export default function AddHospitalEntryForm({onCancel, diagnoses, onSubmit, error, setError}: Props) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [disChargeDate, setDisChargeDate] = useState<Dayjs | null>(null);
  const [disChargeCriteria, setDisChargeCriteria] = useState('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  //const [error, setError] = useState<string>();

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

    if (date === null) {
      setError('date cannot be empty!!');
      return
    }

    if (disChargeDate === null) {
      setError('disChargeDate cannot be empty!!');
      return
    }

    if (disChargeCriteria === '') {
      setError('disChargeCriteria cannot be empty!!');
      return
    }
    

    onSubmit({
      type: TypeCheck.Hospital,
      description,
      specialist,
      date: date.format('YYYY-MM-DD'),
      diagnosisCodes,
      discharge: {
        date: disChargeDate.format('YYYY-MM-DD'),
        criteria: disChargeCriteria
      }
    });
    
    setDescription('')
    setDate(null)
    setSpecialist('')
    setDiagnosisCodes([])
    setDisChargeDate(null)
    setDisChargeCriteria('')
   
  }

  /*
  const includeDiagnosis = (val: string) => {
   return diagnoses.some(item => item.code === val)
    //return diagnoses.some(item => diagnosisCodes.includes(item.code))
  }
  */
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

  /*
  const handleDiagnosisInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('handleDiagnosisInput', event.target.value)
    console.log('diagnosisCodes', diagnosisCodes)
    const splitArr = event.target.value.split(',')
    console.log('splitArr', splitArr)

    console.log( 'split every item code include')
    setDiagnosisCodes([event.target.value])      

    const result = includeDiagnosis(event.target.value)

    console.log('result', result)

    if (result) {
      console.log('includes result' ,diagnosisCodes)
    } else {
      console.log('excludes result', diagnosisCodes)
    }
 
  }
  */
  
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

        <InputLabel style={{ marginTop: 20 }}>disCharge</InputLabel>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={disChargeDate} onChange={(newValue) => setDisChargeDate(newValue)} />
            </DemoContainer>
        </LocalizationProvider>

        <TextField
          label="disCharge_ criteria"
          fullWidth
          value={disChargeCriteria}
          onChange={({ target }) => setDisChargeCriteria(target.value)}
        />

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

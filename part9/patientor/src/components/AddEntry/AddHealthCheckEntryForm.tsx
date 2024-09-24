import { useState, SyntheticEvent } from "react";
import { TextField, InputLabel, Grid, Button, Alert } from '@mui/material';
import { Diagnosis, EntryWithoutId, TypeCheck, HealthCheckRating, HealthCheckRatingEnum } from "../../types";
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

interface HealthCheckRatingOption{
  value: HealthCheckRating;
  label: string;
}

//console.log('HealthCheckRatingEnum', HealthCheckRatingEnum)

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.entries(HealthCheckRatingEnum).map(([key, val]) =>  
   ({ value: val, label: key})
);

export default function AddHealthCheckEntryForm({onCancel, onSubmit, error, setError}: Props) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRatingEnum.Healthy)

  const onHealthCheckRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
     //console.log(event.target.value) 
    
    if (typeof event.target.value === "string") {
      const val = event.target.value 
      const healthCheckRating = Object.values(HealthCheckRatingEnum).find(g => g.toString() === val);

      //console.log('healthCheckRating', healthCheckRating)
      if (healthCheckRating || healthCheckRating === 0) {
        setHealthCheckRating(healthCheckRating);
      }
    }
    
    
    /*
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const healthCheckRating = Object.values(HealthCheckRatingEnum).find(g => g === value)
      if (healthCheckRating) {
        setHealthCheckRating(healthCheckRating);
      }
    }
    */
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

    onSubmit({
      type: TypeCheck.HealthCheck,
      description,
      specialist,
      date: date.format('YYYY-MM-DD'),
      healthCheckRating: Number(healthCheckRating)
     
    });
    
    setDescription('')
    setDate(null)
    setSpecialist('')

  };

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

        <InputLabel style={{ marginTop: 20 }}>HealthCheckRating</InputLabel>
        <select
          className="selectHealthCheck"
          value={healthCheckRating}
          onChange={event => onHealthCheckRatingChange(event)}
        >
        {healthCheckRatingOptions.map(option =>
          <option
            key={option.label}
            value={option.value}
          >
            {option.label
          }</option>
        )}
        </select>
     

   
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

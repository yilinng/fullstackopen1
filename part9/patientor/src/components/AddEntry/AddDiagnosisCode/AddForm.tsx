import { FormControlLabel, Radio, RadioGroup, Button, FormLabel, Grid } from '@mui/material'
import { Diagnosis } from '../../../types';
import {SyntheticEvent, useState} from 'react'


interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: string) => void;
  onCancel: () => void;
  error: string | undefined;
}


export default function AddForm({ diagnoses, onSubmit, onCancel, error }: Props) {
  const [select, setSelect] = useState('')

  const addDiagnosisCode = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit(select)
  }

  return (
    <div>
      <form onSubmit={addDiagnosisCode}>
        <FormLabel id="demo-error-radios">{error}</FormLabel>
        <RadioGroup
          aria-labelledby="diagnoses_radio_buttons_group"
          name="controlled-radio-buttons-group"
          value={select}
            onChange={({ target }) => setSelect(target.value)}
          >
            {diagnoses.map(diagnose =>  <FormControlLabel key={diagnose.code} value={diagnose.code} control={<Radio />} label={diagnose.name} />)}
        </RadioGroup>
       
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
  )
}

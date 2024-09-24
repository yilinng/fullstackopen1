//import React from 'react'
import { SvgIcon } from "@mui/material";
import { OccupationalHealthcareEntry } from '../../types'
import HealingIcon from '@mui/icons-material/Healing';

interface Props {
  entry: OccupationalHealthcareEntry;
 }

export default function OccupationalHealthcare({ entry }: Props) {
  return (
    <div className='occupationalHealthcareEntry entry'>
      <div className='date_icon'>
        <p>{entry.date}</p>
        <SvgIcon component={HealingIcon} />
        <p>{entry.employerName}</p> 
      </div>
    
      <p>{entry.description}</p>

      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}

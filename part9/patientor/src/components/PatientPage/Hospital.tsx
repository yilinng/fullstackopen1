//import React from 'react'
import { HospitalEntry } from '../../types'
import { SvgIcon } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


interface Props {
  entry: HospitalEntry;
 }

export default function Hospital({ entry }: Props) {
  return (
    <div className='hospitalEntry entry'>
      <div className='date_icon'>
        <p>{entry.date}</p>
        <SvgIcon component={LocalHospitalIcon}/>
      </div>
    
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}

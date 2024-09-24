//import React from 'react'
import { SvgIcon } from "@mui/material";
import { HealthCheckEntry } from '../../types'
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink, green, yellow, blue } from "@mui/material/colors";

interface Props {
  entry: HealthCheckEntry;
}

export default function HealthCheck({ entry }: Props) {

  const colorRating = (healthCheckRating: number) => {
    switch (healthCheckRating) {
      case 0:
        return green[500]
      case 1:
        return green[900]
      case 2:
        return yellow[500]
      case 3:
        return pink[500]
      default:
        return blue[500]
    }
  
  }
  return (
    <div className='healthCheckEntry entry'>
       <div className='date_icon'>
        <p>{entry.date}</p>
        <SvgIcon component={WorkIcon} />
      </div>
        <SvgIcon component={FavoriteIcon} sx={{color: colorRating(entry.healthCheckRating)}}/>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}

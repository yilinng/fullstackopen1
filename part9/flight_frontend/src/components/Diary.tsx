import { DiaryEntry } from "../types/types";

export default function Diary(props: DiaryEntry) {
  return (
    <div className='diary'>  
      <p className='date'>{props.date }</p>
        <br/>
      <p>visibility: {props.visibility }</p>
      <p>weather: {props.weather}</p>
      <p>comment: {props.comment }</p>
      <hr />
    </div>
  )
}

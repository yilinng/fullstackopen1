import { useQuery } from '@tanstack/react-query'
import { getAll } from './services/diaries'
import AddDiary from './components/AddDiary'
import Diary from './components/Diary'
import { DiaryEntry } from './types/types'

function App() {

  const diaries_result = useQuery({
    queryKey: ['diaries'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  console.log('diaries_result:', JSON.parse(JSON.stringify(diaries_result)))

  if ( diaries_result.isLoading ) {
    return <div>loading data...</div>
  }

  const diaries = diaries_result.data as DiaryEntry[]

  return (
    <div>
      <AddDiary/>
      <h2>Diary entries</h2>
      {diaries.map(diary => <Diary key={diary.id} {...diary} /> )}
    </div>
  )
}

export default App

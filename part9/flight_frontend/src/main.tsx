import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DiaryContextProvider } from './context/DiaryContext.tsx'
import App from './App.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <DiaryContextProvider>
      <App />
    </DiaryContextProvider>
  </QueryClientProvider>
)

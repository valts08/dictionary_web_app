import './index.css'
import TopBar from './components/top-bar/TopBar'
import { useAppSelector } from './hooks/storeHooks'
import DictionarySection from './components/main-dict-area/DictionarySection'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  const { fontObj, isLightTheme } = useAppSelector(state => state.toggles)

  return (
    <div className={`md:max-w-7/12 md:mx-auto max-w-12/12 mx-5 mt-10 ${fontObj.activeFont.font} `}>
      <TopBar/>
      <div className='mt-8'>
        <QueryClientProvider client={queryClient}>
          <DictionarySection />
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default App

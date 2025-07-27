import './index.css'
import TopBar from './components/top-bar/TopBar'
import { useAppSelector } from './hooks/storeHooks'
import SearchIcon from './assets/images/icon-search.svg'
import DictionarySection from './components/main-dict-area/DictionarySection'
import { useState } from 'react'

function App() {

  const { fontObj } = useAppSelector(state => state.toggles)
  const [searchWord, setSearchWord] = useState("")

  return (
    <div className={`md:max-w-7/12 md:mx-auto max-w-12/12 mx-5 border-1 border-amber-200 mt-10 ${fontObj.activeFont.font}`}>
      <TopBar/>
      <div className='flex mt-10 rounded-xl place-content-between bg-black/10'>
        <input type="text" placeholder='Search for a word...' className='p-3 min-w-8/10 font-bold' onChange={(e) => setSearchWord(e.target.value)} />
        <img src={SearchIcon} alt="search-icon" className='pr-4 cursor-pointer' />
      </div>
      <div className='mt-8'>
        <DictionarySection />
      </div>
    </div>
  )
}

export default App

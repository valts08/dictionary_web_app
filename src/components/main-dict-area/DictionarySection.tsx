import SearchIcon from '../../assets/images/icon-search.svg'
import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

const DictionarySection = () => {

    const [searchWord, setSearchWord] = useState("")

    const { refetch, isRefetchError, error, data, isRefetching } = useQuery({
        queryKey: ["dictionary"],
        queryFn: async () => {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
            
            if (!response.ok) {
                return new Error(`Couldn't fetch data`)
            }

            return response.json()
        },
        retry: 1,
        staleTime: Infinity,
        enabled: false
    })

    return (
        <>
        <div className='flex mt-10 rounded-xl place-content-between bg-black/10'>
            <input type="text" placeholder='Search for a word...' className='p-3 min-w-8/10 font-bold' onChange={(e) => setSearchWord(e.target.value)} />
            <img src={SearchIcon} alt="search-icon" className='pr-4 cursor-pointer' onClick={() => refetch()}/>
        </div>
        {data ? (
            <div>{data[0].meanings[0].definitions[0].definition}</div>
        ) : isRefetchError ? (
            <div>RefetchError</div>
        ) : isRefetching ? (
            <div>...Refetching</div>
        ) : (
            <div>Not ready yet/Nothing</div>
        )}
        </>
    )
}

export default DictionarySection
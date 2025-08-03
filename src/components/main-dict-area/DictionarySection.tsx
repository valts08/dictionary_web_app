import SearchIcon from '../../assets/images/icon-search.svg'
import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

interface DictionarySearchResultType {
    license: object,
    meanings: MeaningsObject[],
    phonetic: string,
    phonetics: object[],
    sourceUrls: object,
    word: string
}

type MeaningsObject = {
    [key: string]: object | string
}

type DefinitionObject = {
    antonyms: object,
    definition: string,
    synonyms: object
}

const DictionarySection = () => {

    const [searchWord, setSearchWord] = useState("")

    const { refetch, isRefetchError, error, data, isRefetching } = useQuery({
        queryKey: ["dictionary", searchWord],
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
                <div>
                    {data && data.map((searchResult: DictionarySearchResultType)  => {
                        return (
                            <div className=''>
                                <div className='flex place-content-between pt-8'>
                                    <div className='flex flex-col'>
                                        <h1 className='text-5xl font-bold'>
                                            {searchResult.word}
                                        </h1>
                                        <span>
                                            {searchResult.phonetic}
                                        </span>
                                    </div>
                                    <button className='border-1'>Audio</button>
                                </div>
                                {searchResult.meanings.map((meaning: any) => {
                                    return (
                                        <div>
                                            <span>{meaning.partOfSpeech}</span>
                                            <span className='block'>Meaning:</span>
                                            <ul>
                                                {meaning.definitions.map((definition: DefinitionObject) => {
                                                    return (
                                                        <div>
                                                            <li></li>
                                                        </div>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                        
                    })}
                    
                </div>
            ) : isRefetchError ? (
                <div>RefetchError</div>
            ) : isRefetching ? (
                <div>...Refetching</div>
            ) : (
                <div></div>
            )}
        </>
    )
}

export default DictionarySection
import SearchIcon from '../../assets/images/icon-search.svg'
import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import AudioPlayBtn from '../../assets/images/icon-play.svg'
import OpenLinkNewWindow from '../../assets/images/icon-new-window.svg'

interface DictionarySearchResultType {
    license: object,
    meanings: MeaningsObject[],
    phonetic: string,
    phonetics: object[],
    sourceUrls: string[],
    word: string
}

type MeaningsObject = {
    [key: string]: object | string | DefinitionObject[]
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
                    {data && data.map((searchResult: DictionarySearchResultType, searchResultId: number)  => {
                        return (
                            <div className=''>
                                <div className='flex place-content-between pt-8' key={searchResultId}>
                                    <div className='flex flex-col'>
                                        <h1 className='text-7xl font-bold'>
                                            {searchResult.word}
                                        </h1>
                                        <span className='pt-5'>
                                            {searchResult.phonetic}
                                        </span>
                                    </div>
                                    <button onClick={() => console.log('pressed play')} className='hover:cursor-pointer'>
                                        <img src={AudioPlayBtn} alt="pronunciation-play-button" />
                                    </button>
                                </div>
                                {searchResult.meanings.map((meaning: any, meaningId: number) => {
                                    return (
                                        <div key={meaningId}>
                                            <span className='block py-6 font-bold'>{meaning.partOfSpeech}</span>
                                            <span>Meaning:</span>
                                            <ol className='pt-4 pb-10'>
                                                {meaning.definitions.map((definitionObject: any, definitionId: number) => {
                                                    return (
                                                        <>
                                                            <li key={definitionId} className='py-1'>
                                                                {`${definitionObject.definition}`}
                                                                <span className='text-red-500 block'>{definitionObject.example}</span>
                                                            </li>
                                                        </>
                                                    )
                                                })}
                                            </ol>
                                            {meaning.synonyms.length ? "Synonyms:" : ""}
                                            {meaning.synonyms.map((synonym: string, synonymId: number) => {
                                                return (
                                                    <span className='pl-5 text-purple-700 font-bold' key={synonymId}>{synonym}</span>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                                {searchResult.sourceUrls.length ? "Source:" : ""}
                                {searchResult.sourceUrls.map((url: string, urlId: number) => {
                                    return (
                                        <>
                                            <a href={url} className='pl-5' key={urlId}>
                                                {url}
                                                <img src={OpenLinkNewWindow} alt="open-link-newtab" className='inline max-w-[12px] max-h-[12px]'/>
                                            </a>
                                        </>
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
import SearchIcon from '../../assets/images/icon-search.svg'
import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { 
    DictionarySearchResultType,  
    StringObject,
    MeaningsObject,
    DefinitionObject, 
    AudioObject 
} from '../../DictDatatypes'
import AudioPlayBtn from '../../assets/images/icon-play.svg'
import OpenLinkNewWindow from '../../assets/images/icon-new-window.svg'


const DictionarySection = () => {

    const [searchWord, setSearchWord] = useState("")
    const [searchBarEmptyStatus, setSearchEmptyBarStatus] = useState(false)
    const searchInputElement: any = document.getElementById('search-term-input')

    let audioObjects: AudioObject = {}

    const { refetch, isRefetchError, data, isRefetching } = useQuery({
        queryKey: ["dictionary", searchWord],
        queryFn: async () => {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
            
            if (response.status == 404) {
                return response.json()
            }

            if (!response.ok) {
                return new Error(`Couldn't fetch data`)
            }

            return response.json()
        },
        retry: 1,
        staleTime: Infinity,
        enabled: false
    })

    const handleRefetch = () => {
        if (searchInputElement == null || searchInputElement.value.trim() == "") {
            setSearchEmptyBarStatus(true)
            return
        } else {
            setSearchEmptyBarStatus(false)
        }
        refetch()
    }

    const gatherSrcAudioHelper = (phoneticsObj: StringObject[]) => {
        let audioSrcs: HTMLAudioElement[] = []

        phoneticsObj.map(phoneticsItem => {
            if (phoneticsItem.hasOwnProperty('audio') && phoneticsItem.audio != "") {
                audioSrcs.push(new Audio(phoneticsItem.audio))
            }
        })
        return audioSrcs
    }

    const audioFileCyclethrough = ({ word, phonetics }: { word: string, phonetics: StringObject[] }, audioItemId: number) => {

        let cycleCount: number = 0
        let cycleCountMax: number = 0

        if (audioObjects[word] && audioObjects[word][audioItemId]) {
            cycleCount = audioObjects[word][audioItemId].audioCycle;
            cycleCountMax = audioObjects[word][audioItemId].audioItemLength - 1
        } else {
            if (!audioObjects[word]) {
                audioObjects[word] = {}
            }
            audioObjects[word][audioItemId] = {
                audioSrc: gatherSrcAudioHelper(phonetics),
                audioItemLength: gatherSrcAudioHelper(phonetics).length,
                audioCycle: 0,
            }
        }

        console.log(audioObjects, 'AUDIO OBJECTS')

        if (cycleCount > cycleCountMax) {
                cycleCount = 0
                audioObjects[word][audioItemId].audioCycle = 0
            }
            
        audioObjects[word][audioItemId.toString()].audioSrc[cycleCount].play()
        audioObjects[word][audioItemId].audioCycle += 1
    }


    return (
        <>
            <div className={`flex mt-10 rounded-xl place-content-between bg-black/10 ${searchBarEmptyStatus ? "border-red-600 border-1" : ""}`}>
                <input id='search-term-input' type="text" placeholder='Search for a word...' className="p-3 min-w-8/10 font-bold" onChange={(e) => setSearchWord(e.target.value)} />
                <img src={SearchIcon} alt="search-icon" className='pr-4 cursor-pointer' onClick={() => handleRefetch()}/>
            </div>
            {searchBarEmptyStatus ? (
                <span className='text-red-600'>Whoops, can't be empty...</span>
            ) : (
                <></>
            )}
            {data?.message ? (
                <div className='flex flex-col place-items-center-safe mt-[25%]'>
                    <img src={AudioPlayBtn} alt="sad-emoji" className='max-w-[75px] max-h-[75px]'/>
                    <span className='text-3xl block font-bold py-5'>{data.title}</span>
                    <div className='text-wrap text-center'>
                        {data.message} {data.resolution}
                    </div>
                </div>
            ) : data ? (
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
                                    <button onClick={() => audioFileCyclethrough(searchResult, searchResultId)} className='hover:cursor-pointer'>
                                        <img src={AudioPlayBtn} alt="pronunciation-play-button" />
                                    </button>
                                </div>
                                {searchResult.meanings.map((meaning: MeaningsObject, meaningId: number) => {
                                    return (
                                        <div key={meaningId}>
                                            <span className='block py-6 font-bold'>{meaning.partOfSpeech}</span>
                                            <span>Meaning:</span>
                                            <ol className='pt-4 pb-10'>
                                                {meaning.definitions.map((definitionObject: DefinitionObject, definitionId: number) => {
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
                                                    <span className='pl-5 text-purple-700 font-bold text-wrap' key={synonymId}>{synonym}</span>
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
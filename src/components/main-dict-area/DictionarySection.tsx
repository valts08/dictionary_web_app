import SearchIcon from '../../assets/images/icon-search.svg'
import "./../../index.css"
import OpenLinkNewWindow from '../../assets/images/icon-new-window.svg'
import ConfusedEmoji from '../../assets/images/confused-emoji.png'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { useAppSelector } from '../../hooks/storeHooks'
import { 
    DictionarySearchResultType,  
    StringObject,
    MeaningsObject,
    DefinitionObject, 
    AudioObject 
} from '../../DictDatatypes'


const DictionarySection = () => {

    const [searchWord, setSearchWord] = useState("")
    const [searchBarEmptyStatus, setSearchEmptyBarStatus] = useState(false)
    const { isLightTheme } = useAppSelector(state => state.toggles)
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


        if (cycleCount > cycleCountMax) {
                cycleCount = 0
                audioObjects[word][audioItemId].audioCycle = 0
            }
            
        audioObjects[word][audioItemId.toString()].audioSrc[cycleCount].play()
        audioObjects[word][audioItemId].audioCycle += 1
    }

    return (
        <>
            <motion.div 
                className={`flex mt-10 rounded-xl place-content-between ${isLightTheme ? "bg-secondary-purple" : "bg-custom-two-black"} ${searchBarEmptyStatus ? "border-primary-red border-1" : ""} hover:border-primary-purple`}
                initial={{ border: "solid 0px", borderColor: `${ isLightTheme ? "#FFFFFF" :"#000000"}` }}
                whileHover={{ 
                    border: "solid 1px",
                    borderColor: "#A445ED",
                    transition: { ease: "easeIn", duration: .1} 
                }}
                >
                <input id='search-term-input' type="text" placeholder='Search for any word...' className={`p-3 min-w-8/10 font-bold outline-0 ${isLightTheme ? "" : "text-white"}`} onChange={(e) => setSearchWord(e.target.value)} />
                <img src={SearchIcon} alt="search-icon" className='pr-4 cursor-pointer' onClick={() => handleRefetch()}/>
            </motion.div>
            {searchBarEmptyStatus ? (
                <span className='text-primary-red'>Whoops, can't be empty...</span>
            ) : (
                <></>
            )}
            {data?.message ? (
                <motion.div 
                    className='flex flex-col place-items-center-safe mt-[25%]'
                    initial={{ opacity: 0, scale: 0 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: .3 }}
                >
                    <img src={ConfusedEmoji} alt="confused-emoji" className='max-w-[75px] max-h-[75px]'/>
                    <span className='text-3xl block font-bold py-5'>{data.title}</span>
                    <div className='text-wrap text-center'>
                        {data.message} {data.resolution}
                    </div>
                </motion.div>
            ) : data ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: .1 }}
                >
                    {data && data.map((searchResult: DictionarySearchResultType, searchResultId: number)  => {
                        return (
                            <div className=''>
                                <div className='flex place-content-between pt-8' key={searchResultId}>
                                    <div className='flex flex-col'>
                                        <h1 className='text-7xl font-bold'>
                                            {searchResult.word}
                                        </h1>
                                        <span className='pt-5 text-primary-purple'>
                                            {searchResult.phonetic}
                                        </span>
                                    </div>
                                    <button onClick={() => audioFileCyclethrough(searchResult, searchResultId)} className='hover:cursor-pointer'>
                                        <svg xmlns='http://www.w3.org/2000/svg' width='75' height='75' viewBox='0 0 75 75'>
                                            <g id="audio-play-btn" fill='#A445ED' fill-rule='evenodd'>
                                                <circle id='audio-circle' cx='37.5' cy='37.5' r='37.5' opacity='.25'/>
                                                <path id='audio-triangle' d='M29 27v21l21-10.5z'/>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                                {searchResult.meanings.map((meaning: MeaningsObject, meaningId: number) => {
                                    return (
                                        <div key={meaningId}>
                                            <div className='flex py-6'>
                                                <span className='font-bold italic'>{meaning.partOfSpeech}</span>
                                                <div className={`flex-2 pt-[0.75rem] ml-5 w-100 border-b-1 ${isLightTheme ? "border-secondary-grey" : "border-custom-four-black"} h-[50%]`}></div>
                                            </div>
                                            <span className='text-primary-grey'>Meaning:</span>
                                            <ol className='list-disc pt-4 pb-10 ml-9 marker:text-primary-purple'>
                                                {meaning.definitions.map((definitionObject: DefinitionObject, definitionId: number) => {
                                                    return (
                                                        <>
                                                            <li key={definitionId} className='py-1'>
                                                                {`${definitionObject.definition}`}
                                                                {definitionObject.example && <span className='text-primary-grey block'>"{definitionObject.example}"</span>}
                                                            </li>
                                                        </>
                                                    )
                                                })}
                                            </ol>
                                            <div className='pb-5'>
                                                {meaning.synonyms.length ? <span className='text-primary-grey'>Synonyms</span> : ""}
                                                {meaning.synonyms.map((synonym: string, synonymId: number) => {
                                                    return (
                                                        <span className='pl-5 text-primary-purple font-bold text-wrap hover:cursor-pointer hover:underline-offset-2 hover:underline hover:decoration-primary-purple' key={synonymId}>{synonym}</span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className={`border-t-1 pb-5 ${isLightTheme ? "border-secondary-grey" : "border-custom-four-black"}`}></div>
                                {searchResult.sourceUrls.length ? "Source:" : ""}
                                {searchResult.sourceUrls.map((url: string, urlId: number) => {
                                    return (
                                        <>
                                            <a href={url} className='pl-5' key={urlId}>
                                                {url}
                                                <img src={OpenLinkNewWindow} alt="open-link-newtab" className='inline max-w-[12px] max-h-[12px] ml-2 mb-1'/>
                                            </a>
                                        </>
                                    )
                                })}
                            </div>
                        )
                    })}
                </motion.div>
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
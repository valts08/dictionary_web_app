interface DictionarySearchResultType {
    license: object,
    meanings: MeaningsObject[],
    phonetic: string,
    phonetics: StringObject[],
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

type StringObject = {
    audio: string,
    license: object,
    sourceUrl: string,
    text: string,
}

type AudioIdObject = {
    audioSrc: HTMLAudioElement[],
    audioItemLength: number,
    audioCycle: number
}

type AudioEl = {
    [key: string]: AudioIdObject
}

type AudioObject = {
    [key: string]: AudioEl
}

export { 
    DictionarySearchResultType, 
    StringObject, 
    AudioObject 
}
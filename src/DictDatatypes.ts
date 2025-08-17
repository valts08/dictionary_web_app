interface DictionarySearchResultType {
    license: object,
    meanings: MeaningsObject[],
    phonetic: string,
    phonetics: StringObject[],
    sourceUrls: string[],
    word: string
}

type MeaningsObject = {
    antonyms: string[],
    definitions: DefinitionObject[],
    partOfSpeech: string,
    synonyms: string[]
}

type DefinitionObject = {
    antonyms: string[],
    definition: string,
    synonyms: string[],
    example: string
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
    MeaningsObject,
    DefinitionObject,
    AudioObject 
}
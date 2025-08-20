import { useState } from "react"
import FontChangeArrowIcon from "../../assets/images/icon-arrow-down.svg"
import { createPortal } from "react-dom"
import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks"
import { switchFont } from "../../store/toggle_slice/toggleSlice"

const FontSwitch = () => {

    const { fontObj } = useAppSelector(state => state.toggles)
    const dispatch = useAppDispatch()

    // const [lightMode, setLightMode] = useState(false)
    // for when I implement dark/light theme switching

    const [modalOpen, setModalOpen] = useState(false)

    const handleDispatch = (payload: object) => {
        dispatch(switchFont(payload))
        setModalOpen(false)
    }

    return (
        <div className="relative flex place-self-center hover:cursor-pointer pr-5 pb-1 border-r-1 border-gray-400/30">
            <div className="flex" onClick={() => setModalOpen(prev => !prev)}>
                <span className="text-nowrap font-bold">{fontObj.activeFont.name}</span>
                <img src={FontChangeArrowIcon} alt="arrow-icon" className="self-center w-[12px] h-[6px] ml-3"/>
            </div>
                {modalOpen && createPortal(
                    <div className="absolute top-[10%] right-[20%] sm:right-[16%] md:right-[33%] lg:right-[26.5%] border-0 rounded-lg shadow-xl h-[140px] w-[183px] px-5 flex flex-col justify-evenly font-bold bg-white">
                        <div className="font-sans-serif cursor-pointer hover:text-primary-purple" onClick={() => handleDispatch({ name: "Sans Serif", font: "font-sans-serif"})}>Sans Serif</div>
                        <div className="font-mono cursor-pointer hover:text-primary-purple" onClick={() => handleDispatch({ name: "Mono", font: "font-mono"})}>Mono</div>
                        <div className="font-sans cursor-pointer hover:text-primary-purple" onClick={() => handleDispatch({ name: "Sans", font: "font-sans"})}>Sans</div>
                    </div>
                , document.body)}
        </div>
    )
}

export default FontSwitch
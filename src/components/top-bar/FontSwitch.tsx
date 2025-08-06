import { useState } from "react"
import FontChangeArrowIcon from "../../assets/images/icon-arrow-down.svg"
import { createPortal } from "react-dom"
import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks"
import { switchFont } from "../../store/toggle_slice/toggleSlice"

const FontSwitch = () => {

    const { fontObj } = useAppSelector(state => state.toggles)
    const dispatch = useAppDispatch()

    const [lightMode, setLightMode] = useState(false)

    return (
        <div className="relative flex place-self-center hover:cursor-pointer pr-5 pb-1 border-r-1 border-gray-400/30">
            <div className="flex" onClick={() => setLightMode(prev => !prev)}>
                <span className="text-nowrap">{fontObj.activeFont.name}</span>
                <img src={FontChangeArrowIcon} alt="arrow-icon" className="self-center w-[12px] h-[6px] ml-3"/>
            </div>
                {lightMode && createPortal(
                    <div className="absolute top-1 right-1">
                        <ul>
                            <li className="font-sans-serif cursor-pointer" onClick={() => dispatch(switchFont({ name: "Sans Serif", font: "font-sans-serif"}))}>Sans Serif</li>
                            <li className="font-mono cursor-pointer" onClick={() => dispatch(switchFont({ name: "Mono", font: "font-mono"}))}>Mono</li>
                            <li className="font-sans cursor-pointer" onClick={() => dispatch(switchFont({ name: "Sans", font: "font-sans"}))}>Sans</li>
                        </ul>
                    </div>
                , document.body)}
        </div>
    )
}

export default FontSwitch
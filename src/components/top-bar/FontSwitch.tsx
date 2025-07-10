import FontChangeArrowIcon from "../../assets/images/icon-arrow-down.svg"

const FontSwitch = () => {

    return (
        <div className="flex place-self-center hover:cursor-pointer pr-3 py-1 border-r-1 border-gray-400/30">
            <span className="text-nowrap">Sans Serif</span>
            <img src={FontChangeArrowIcon} alt="arrow-icon" className="self-center w-[12px] h-[6px] ml-3" />
        </div>
    )
}

export default FontSwitch
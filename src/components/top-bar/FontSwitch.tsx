import FontChangeArrowIcon from "../../assets/images/icon-arrow-down.svg"

const FontSwitch = () => {

    return (
        <div className="flex place-self-center hover:cursor-pointer mr-3">
            <span className="text-nowrap">Sans Serif</span>
            <img src={FontChangeArrowIcon} alt="arrow-icon" className="self-center ml-1 w-[12px] h-[6px]" />
        </div>
    )
}

export default FontSwitch
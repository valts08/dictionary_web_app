import MoonIcon from '../../assets/images/icon-moon.svg'
import CustomModeToggleSwitch from '../../styled-components/CustomModeToggleSwitch';

const ModeToggle = () => {

    return (
        <div className="flex place-items-center pl-2">
            <CustomModeToggleSwitch disableRipple disableTouchRipple className='mt-[3px]'/>
            <img src={MoonIcon} alt="moon-icon" className='w-[20px] h-[20px] mb-[3px]'/>
        </div>
        
    )
}

export default ModeToggle
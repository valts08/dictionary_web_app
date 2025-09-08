import MoonIcon from '../../assets/images/icon-moon.svg'
import CustomModeToggleSwitch from '../../styled-components/CustomModeToggleSwitch';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { toggleTheme } from '../../store/toggle_slice/toggleSlice';

const ModeToggle = () => {

    const dispatch = useAppDispatch()

    return (
        <div className="flex place-items-center pl-3">
            <CustomModeToggleSwitch disableRipple disableTouchRipple className='mt-[3px]' onClick={() => dispatch(toggleTheme())}/>
            <img src={MoonIcon} alt="moon-icon" className='w-[20px] h-[20px] mb-[2px]'/>
        </div>
        
    )
}

export default ModeToggle
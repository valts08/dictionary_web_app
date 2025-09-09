import CustomModeToggleSwitch from '../../styled-components/CustomModeToggleSwitch';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { toggleTheme } from '../../store/toggle_slice/toggleSlice';

const ModeToggle = () => {

    const dispatch = useAppDispatch()
    const { isLightTheme } = useAppSelector(state => state.toggles)

    return (
        <div className="flex place-items-center pl-3">
            <CustomModeToggleSwitch disableRipple disableTouchRipple className='mt-[3px]' onClick={() => dispatch(toggleTheme())}/>
            <svg xmlns='http://www.w3.org/2000/svg' className='mb-[2px]' width='22' height='22' viewBox='0 0 22 22'>
                <path fill='none' stroke={`${ isLightTheme ? "#838383" : "#A445ED"}`} stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z'/>
            </svg>
        </div>
        
    )
}

export default ModeToggle
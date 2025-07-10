import Logo from '../../assets/images/logo.svg'
import FontSwitch from './FontSwitch'
import ModeToggle from './ModeToggle'

const TopBar = () => {

    return (
        <div className='flex justify-between'>
            <img src={Logo} alt="logo-img" className='w-[36.5px] h-[32px] self-center'/>
            <div className='flex place-content-between'>
                <FontSwitch />
                <ModeToggle />
            </div>
        </div>
    )
}

export default TopBar
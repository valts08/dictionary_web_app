import Logo from '../../assets/images/logo.svg'
import FontSwitch from './FontSwitch'
import ModeToggle from './ModeToggle'
import { motion } from 'motion/react'

const TopBar = () => {

    return (
        <div className='flex justify-between'>
            <motion.img 
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: .3 }}
                src={Logo} alt="logo-img" className='w-[36.5px] h-[32px] self-center'/>
            <div className='flex place-content-between'>
                <FontSwitch />
                <ModeToggle />
            </div>
        </div>
    )
}

export default TopBar
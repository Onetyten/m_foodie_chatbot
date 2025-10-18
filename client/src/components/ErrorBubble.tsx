import {motion} from 'framer-motion'
import { MdError } from "react-icons/md";

interface propTypes{
    message:string
}

export default function ErrorBubble(props:propTypes) {
    const {message} = props
  return (
        <motion.div initial={{x:15, y:50, opacity:0}}  animate={{x:0,y:0,opacity:100}} transition={{duration:0.2}}  className='bg-primary text-background flex gap-1 rounded-2xl sm:text-sm text-xs p-2.5 px-4 sm:px-6 rounded-tl-none' >
            <MdError className='text-red-500 text-xl'/>
            <p>{message}</p>
            
        </motion.div>
  )
}

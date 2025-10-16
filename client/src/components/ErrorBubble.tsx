import {motion} from 'framer-motion'
import { MdError } from "react-icons/md";

interface propTypes{
    message:string
}

export default function ErrorBubble(props:propTypes) {
    const {message} = props
  return (
        <motion.div initial={{x:15, y:50, opacity:0}}  animate={{x:0,y:0,opacity:100}} transition={{duration:0.2}}  className='bg-secondary-100 flex gap-1 p-2.5 px-6 rounded-2xl text-sm' >
            <MdError className='text-red-500 text-xl'/>
            <p>{message}</p>
            
        </motion.div>
  )
}

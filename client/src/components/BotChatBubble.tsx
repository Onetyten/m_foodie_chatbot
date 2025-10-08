import {motion} from 'framer-motion'


interface propTypes{
    message:string
}

export default function BotChatBubble(props:propTypes) {
    const {message} = props
  return (
        <motion.p initial={{x:15, y:50, opacity:0}}  animate={{x:0,y:0,opacity:100}} transition={{duration:0.2}}  className='bg-secondary-100 p-2.5 px-6 rounded-2xl text-sm' >
            {message}
        </motion.p>
  )
}

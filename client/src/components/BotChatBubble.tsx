import {motion} from 'framer-motion'


interface propTypes{
    message:string,
    index:number,
}

export default function BotChatBubble(props:propTypes) {
    const {message,index} = props
  return (
        <motion.p initial={{x:15, y:50, opacity:0}}  animate={{x:0,y:0,opacity:100}} transition={{duration:0.2}}  className={`bg-primary text-background p-2.5 px-6 rounded-2xl text-sm ${index==0?"rounded-tl-none":""}`} >
            {message}
        </motion.p>
  )
}

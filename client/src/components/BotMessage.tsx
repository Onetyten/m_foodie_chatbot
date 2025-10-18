import { useEffect, useRef, useState } from 'react'
import logoImg from '../assets/logo.gif'
import { Digital } from "react-activity"
import BotChatBubble from './BotChatBubble'


interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:string[]
    }
}

export default function BotMessage(props:propType) {
    const {message} = props
    const [displayedMessage,setDisplayedMessage] = useState<string[]>([])
    const [isTyping,setIsTyping] = useState(true)
    const indexRef = useRef(0)

    useEffect(()=>{
        indexRef.current = -1
        let isCancelled = false
        function loadNextMessage(){
            if (isCancelled) return
            if (indexRef.current < message.content.length-1){
                setIsTyping(true)
                setTimeout(()=>{
                    if (isCancelled) return
                    setIsTyping(false)
                    setDisplayedMessage((prev) => [...prev, message.content[indexRef.current]]);
                    indexRef.current++;
                    if (indexRef.current<message.content.length-1){
                        setTimeout(loadNextMessage,500)
                    }
                    else{
                        if (message.next) message.next()
                        
                    }
                },800)
            }
        }
        loadNextMessage()
        

        return ()=>{
            isCancelled = true
        }
    },[message, message.content])
    
  return (
    <div className="max-w-8/12 flex gap-2 items-start">
        <div className='bg-primary sm:min-w-10 min-w-8 size-8 sm:size-10 rounded-full flex justify-center items-center'>
            <img src={logoImg} className="size-6 sm:size-8" alt="" />
        </div>
        <div className='flex flex-col gap-0.5 justify-start '>
            {displayedMessage.map((item,index)=>{
                return(
                    <div key={index} className=" flex justify-start items-center text-primary ">
                        <BotChatBubble message={item} index ={index}/>
                    </div>
                )
            })}
            {isTyping&&(
                <div className=" flex justify-start items-center text-primary ">
                    <div className='bg-primary text-background p-2.5 px-6 rounded-2xl text-sm' >
                    <Digital/>  
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}



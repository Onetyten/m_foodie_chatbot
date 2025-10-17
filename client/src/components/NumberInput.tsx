import {motion} from 'framer-motion'
import type { FoodType } from '../../types/type'
import { useEffect, useState } from 'react'
import { Digital } from 'react-activity'
import { toWords } from 'number-to-words'


interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:FoodType[]
    },
    confirm:(value:number,food:FoodType)=>void
}

export default function NumberInput(props:propType) {
  const {confirm,message} = props 
  const [value,setValue] = useState(1)
  const [confirmed,setConfirmed] = useState(false)
  const [isTyping,setIsTyping] = useState(true)
  
  useEffect(()=>{
    setIsTyping(true)
    setTimeout(()=>{
      setIsTyping(false)
    },1000)
  },[confirmed])

  if (!confirmed){
    return(
        <div className="w-full justify-end flex">
          <motion.div initial={{opacity:0,x:50}} animate={{opacity:100, x:0}} transition={{duration:0.2, delay:0.5, ease:['easeOut']}}  className="flex gap-2 max-w-8/12 justify-end">
            <input type='number' value={value} onChange={(e)=>
              {
                const val = parseInt(e.target.value)
                if (isNaN(val)){
                  setValue(1)
                }
                if (val>10){
                  setValue(10)
                }
                else if (val<1){
                  setValue(1)
                }
                else{
                  setValue(val)
                }
              }}
              className="p-2 border w-10 rounded-sm cursor-pointer focus:bg-secondary-300/10 focus:outline-0" />
            <div onClick={()=>{
              confirm(value,message.content[0])
              setConfirmed(true)
              }}
              className="p-2 border rounded-sm cursor-pointer hover:bg-secondary-300/10">
                  Confirm
            </div>
          </motion.div>
        </div>
    )
  }


  return (
      <div className='flex w-full flex-col gap-0.5 justify-end'>
          {!isTyping?
          (<div className=" flex justify-end items-center text-primary ">
              <p className='bg-white text-secondary-100 p-2.5 px-6 rounded-2xl capitalize text-sm' >
                  {toWords(value)}
              </p>
          </div>):(
          <div className=" flex justify-end items-center text-primary ">
              <div className='bg-white p-2.5 px-6 rounded-2xl text-sm' >
                  <Digital/>  
              </div>
          </div>
          )}
      </div>
  )
}
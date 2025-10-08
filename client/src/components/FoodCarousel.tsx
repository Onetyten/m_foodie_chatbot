import React, { useEffect, useState } from "react"
import { Spinner } from "react-activity"
import {motion} from 'framer-motion'
import api from "../../config/api"
import type {subCategoryType} from '../../types/type'

interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:string[]
    },
    setLoadingFood:React.Dispatch<React.SetStateAction<boolean>>,
    messageSize:number,
    index:number,
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}

export default function FoodCarousel(props:propType) {
    const {message,setLoadingFood,messageSize,index,setShowModal} = props
    const [foodList,setFoodList] = useState<subCategoryType[]>([])
    const [displayedFood,setDisplayedFood] = useState<subCategoryType[]>([])
    useEffect(()=>{
        async function getFoodList() {
           try {
             const response = await api.get(`/food/list/${message.content[0]}`)
             if (response.data.success == false) return
             setFoodList(response.data.data)
             setDisplayedFood(response.data.data.slice(0,3))
             if (message.next) message.next()
           }
           catch (error) {
            console.log(error)
           }
           finally{
            setLoadingFood(false)
           }
        }
        getFoodList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[message, message.content])
    

      if (foodList.length==0){
        return(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="flex flex-col justify-center items-center gap-2">
                <div className="flex w-full gap-2 flex-wrap justify-center">
                    <div className="bg-muted/40 flex justify-center items-center w-[186px] h-60 rounded-md">
                        <Spinner/>
                    </div>
                    <div className="bg-muted/40 flex justify-center items-center w-[186px] h-60 rounded-md">
                        <Spinner/>
                    </div>
                    <div className="bg-muted/40 flex justify-center items-center w-[186px] h-60 rounded-md">
                        <Spinner/>
                    </div>
                </div>
            </motion.div>
        )
      }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="flex flex-col justify-center items-center gap-2">
        <div className="flex w-full gap-2 flex-wrap justify-center items-center">
            {displayedFood.map((item,index)=>{
                return(
                    <div key={index} className="bg-white hover:bg-background hover:shadow-xl shadow-secondary-300/10 cursor-pointer p-3 flex justify-center items-center flex-col w-[186px] h-60 rounded-md">
                        <div className="flex-1 flex justify-center items-center text-center h-full w-full">
                            <img className="size-40 object-contain rounded-md" src={item.imageUrl} alt="" />
                        </div>
                        <div className="font-squada text-center text-xl">
                            {item.name}
                        </div>
                    </div>
                )
            })}
        </div>
        {index+1 == messageSize&&foodList.length>3 && (
            <motion.div onClick={()=>{setShowModal(true)}} initial={{opacity:0,y:50}} animate={{opacity:100, y:0}} transition={{delay:1}} className="p-2 border rounded-sm cursor-pointer hover:bg-secondary-300/10">
                View all
            </motion.div>
        )}
    </motion.div>


  )
}
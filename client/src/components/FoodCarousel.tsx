import React, { useEffect, useState } from "react"
import { Spinner } from "react-activity"
import {motion} from 'framer-motion'
import api from "../../config/api"
import type {FoodType} from '../../types/type'
import { useDispatch } from "react-redux"
import { setList } from "../../store/currentList"
import FoodCard from "./FoodCard"

interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:string[]
    },
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    onClick:(food:FoodType)=>void,
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>
}

export default function FoodCarousel(props:propType) {
    const {message,setLoading,onClick,setShowOptions} = props
    const dispatch = useDispatch()
    const [foodList,setFoodList] = useState<FoodType[]>([])
    const [displayedFood,setDisplayedFood] = useState<FoodType[]>([])
    useEffect(()=>{
        async function getFoodList() {
           try {
             setShowOptions(false)
             const response = await api.get(`/food/list/${message.content[0]}`)
             if (response.data.success == false) return
             dispatch(setList(response.data.data))
             setFoodList(response.data.data)
             setDisplayedFood(response.data.data.slice(0,3))
             if (message.next) message.next()
           }
           catch (error) {
            console.log(error)
           }
           finally{
            setLoading(false)
            setShowOptions(true)
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
                    <FoodCard key={index} food={item} onClick={onClick}/>
                )
            })}
        </div>
    </motion.div>
  )
}





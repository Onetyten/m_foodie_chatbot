import React, { useEffect, useState } from "react"
import { Spinner } from "react-activity"
import {motion} from 'framer-motion'
import api from "../../config/api"
import type {FoodType} from '../../types/type'
import { useDispatch } from "react-redux"
import { setList } from "../../store/currentList"

interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:string[]
    },
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    onClick:(food:FoodType)=>void
}

export default function FoodCarousel(props:propType) {
    const {message,setLoading,onClick} = props
    const dispatch = useDispatch()
    const [foodList,setFoodList] = useState<FoodType[]>([])
    const [displayedFood,setDisplayedFood] = useState<FoodType[]>([])
    useEffect(()=>{
        async function getFoodList() {
           try {
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
                    <div onClick={()=>{onClick(item)}} key={index} className="bg-white overflow-hidden hover:bg-background hover:shadow-xl shadow-secondary-300/10 cursor-pointer p-3 flex justify-center items-center flex-col w-[186px] h-72 gap-1 rounded-md">
                        <div className="flex-1 flex justify-center items-center text-center h-full w-full">
                            <img className="size-32 object-contain rounded-md" src={item.imageUrl} alt="" />
                        </div>
                        <div className="font-squada capitalize text-center text-2xl">
                            {item.name}
                        </div>
                        <div className="w-full text-xs text-stone-500 flex justify-between items-center">
                            <p>
                                {item.calories} calories
                            </p>
                            <p className="p-2 text-secondary-100 font-squada text-xl">
                                &#8358;{item.price}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    </motion.div>
  )
}
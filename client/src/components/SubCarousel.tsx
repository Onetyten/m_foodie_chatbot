import { useEffect, useState } from "react"
import { Spinner } from "react-activity"
import {motion} from 'framer-motion'
import api from "../../utils/api"
import type {subCategoryType} from '../../types/type'
import patternImg from '../assets/patterns/pattern.webp'

interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:string[]
    },
    fetchFoodList:(category:subCategoryType)=>void,
    
}

export default function SubCarousel(props:propType) {
    const {message,fetchFoodList} = props
    const [subcategoryList,setSubcategoryList] = useState<subCategoryType[]>([])
    useEffect(()=>{
        async function getSubCategory() {
           try {
             const response = await api.get(`/food/subcategory/${message.content[0]}`)
             if (response.data.success == false) return
             setSubcategoryList(response.data.data)
             if (message.next) message.next()
           }
           catch (error) {
            console.log(error)
           }
        }
        getSubCategory()
    },[message, message.content])
    

      if (subcategoryList.length==0){
        
        return(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="flex w-full gap-2 flex-wrap justify-center">
                <div className="bg-muted/40 flex justify-center items-center w-[186px] h-52 rounded-md">
                    <Spinner/>
                </div>
                <div className="bg-muted/40 flex justify-center items-center w-[186px] h-52 rounded-md">
                    <Spinner/>
                </div>
                <div className="bg-muted/40 flex justify-center items-center w-[186px] h-52 rounded-md">
                    <Spinner/>
                </div>
            </motion.div>
        )
      }

  return (
    <div className="flex w-full gap-2 flex-wrap justify-center items-center">
        {subcategoryList.map((item,index)=>{
            return(
                <div onClick={()=>{fetchFoodList(item)}} key={index} className="hover:bg-secondary-200/20 hover:shadow-xl shadow-secondary-100/10 cursor-pointer p-3 flex justify-center items-center flex-col w-[186px] h-52 rounded-md bg-auto bg-center" style={{backgroundImage:`url(${patternImg})`}}>
                    <div className="flex-1 flex justify-center items-center text-center h-full w-full">
                        <img className="size-32 object-contain rounded-full" src={item.imageUrl} alt="" />
                    </div>
                    <div className="capitalize text-center text-secondary-100 text-lg font-bold">
                        {item.name}
                    </div>
                </div>
            )
        })}
    </div>
  )
}
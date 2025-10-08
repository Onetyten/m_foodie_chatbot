import { useState } from "react"
import { Spinner } from "react-activity"
import {motion} from 'framer-motion'

interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:string[]
    }
}

export default function SubCarousel(props:propType) {
    const {message} = props
    const [subcategoryList,setSubcategoryList] = useState([])

      if (subcategoryList.length==0){
        return(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="flex w-full gap-2 flex-wrap justify-center h-40">
                <div className="bg-muted/40 flex justify-center items-center size-40 rounded-md">
                    <Spinner/>
                </div>
                <div className="bg-muted/40 flex justify-center items-center size-40 rounded-md">
                    <Spinner/>
                </div>
                <div className="bg-muted/40 flex justify-center items-center size-40 rounded-md">
                    <Spinner/>
                </div>
            </motion.div>
        )
      }
  return (
    <div>subcategoryCarousel</div>
  )
}
import type { customisationType, tweakType } from '../../types/type'
import {motion} from 'framer-motion'
import { MdCheckBox } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";


interface propType{
    edit:customisationType,
    tweakList:tweakType[],
    setTweakList:React.Dispatch<React.SetStateAction<tweakType[]>>
}

export default function OptionCheckbox(props:propType) {
    const {edit,tweakList,setTweakList} = props
    const [isChecked,setIsChecked] = useState(false)

    useEffect(()=>{
        if (isChecked){
            const property = tweakList.find(property=>property.name == edit.name)
            if (property) return
            const payload:tweakType = {name:edit.name,type:edit.type,value:isChecked?"true":"false",price:edit.options[0].extraPrice}
            setTweakList((prev)=>[...prev, payload])
        }
        else{
            setTweakList((prev)=>prev.filter(change=>change.name !== edit.name ))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isChecked])
    
    function HandleCheck(){
       setIsChecked(!isChecked)
    }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1, ease:['easeOut']}} className="w-72 rounded-sm h-10 text-sm flex justify-between px-4 items-center gap-1 border border-secondary-100">
        {edit.name}
        <div onClick={HandleCheck} className="text-3xl cursor-pointer">
            {isChecked?<MdCheckBox/>:<MdOutlineCheckBoxOutlineBlank/>}
        </div>
    </motion.div>
  )
}
 
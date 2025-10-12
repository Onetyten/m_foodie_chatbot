import type { customisationType, tweakType } from '../../types/type'
import {motion} from 'framer-motion'
import { PiMinusCircle, PiPlusCircle } from 'react-icons/pi'
import React, { useEffect, useState } from 'react';




interface propType{
    edit:customisationType,
    tweakList:tweakType[],
    setTweakList:React.Dispatch<React.SetStateAction<tweakType[]>>
}

export default function OptionQuantity(props:propType) {
    const {edit,setTweakList} = props
    const [quantity,setQuantity] = useState(edit.quantity.size)
    const [touched, setTouched] = useState(false);

    useEffect(()=>{
        if (!touched) return
        if (quantity>edit.quantity.max) setQuantity(edit.quantity.max)
        if (quantity<edit.quantity.min) setQuantity(edit.quantity.min)
        if (quantity>0){
            setTweakList((prev) => {
                const existingIndex = prev.findIndex(item=>item.name === edit.name)
                const payload:tweakType = {name:edit.name, type:edit.type, value:quantity.toString(), price:edit.options[0].extraPrice}
                if (existingIndex !== -1){
                    const updated = [...prev]
                    updated[existingIndex] = payload
                    return updated
                }
                return [...prev,payload]
            })
        }
        else{
            setTweakList((prev)=>prev.filter(change=>change.name !== edit.name ))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[quantity,touched])

    function handleSetSize(delta:number){
        setTouched(true)
        setQuantity(quantity+delta)
    }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1, ease:['easeOut']}} className="w-72 rounded-sm h-10 text-sm flex justify-between px-4 items-center gap-1 border border-secondary-100">
        <div>
            {edit.name.slice(0,20)}
        </div>
        <div className="flex gap-1 text-2xl justify-center items-center">
            <PiPlusCircle onClick={()=>handleSetSize(1)} className="cursor-pointer" />
            <p className="text-sm">
                {quantity}
            </p>
            <PiMinusCircle onClick={()=>handleSetSize(-1)} className="cursor-pointer" />
        </div>
    </motion.div>
  )
}

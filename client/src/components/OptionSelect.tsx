import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react'
import { IoChevronDown } from "react-icons/io5"
import type { customisationType, optionType, tweakType } from '../../types/type'
import {motion} from 'framer-motion'
import type React from 'react'
import { useEffect, useState } from 'react'




interface propType{
    edit:customisationType,
    tweakList:tweakType[],
    setTweakList:React.Dispatch<React.SetStateAction<tweakType[]>>
}



export default function OptionSelect(props:propType) {
    const {edit,setTweakList} = props
    const [selectedOption,setSelectedOption] = useState<optionType|null>(null)

    useEffect(()=>{
        if (!selectedOption) return
        setTweakList((prev) => {
            const existingIndex = prev.findIndex(item=>item.name === edit.name)
            const payload:tweakType = {name:edit.name, type:edit.type, value:selectedOption.label, price:selectedOption.extraPrice}
            if (existingIndex !== -1){
                const updated = [...prev]
                updated[existingIndex] = payload
                return updated
            }
            return [...prev,payload]
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedOption])


  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1, ease:['easeOut']}} className="w-72 rounded-sm h-10 text-sm flex justify-between px-4 items-center border capitalize border-secondary-100 cursor-pointer">
        <div className="relative w-full h-full flex focus:outline-0">
            <Listbox value={edit.options[0]} onChange={(value)=>{setSelectedOption(value)}}>
                <ListboxButton className='w-72 focus:outline-0 h-10 flex justify-between items-center select-none rounded-sm cursor-pointer'>
                    <p className='capitalize'>{selectedOption ? selectedOption.label : edit.name.slice(0,24)} </p>
                    <IoChevronDown/>
                </ListboxButton>
                <ListboxOptions className='absolute w-full border top-11 flex flex-col justify-center items-center text-center rounded-sm z-10 bg-background'>
                    {edit.options.map((item,index)=>{
                        return(
                            <ListboxOption className={({focus,selected})=>`w-full capitalize select-none p-2 ${focus?"bg-secondary-200/20":selected?"bg-secondary-200/30":""}`} key={index} value={item}>
                                {item.label}
                            </ListboxOption>
                        )
                    })}
                </ListboxOptions>
            </Listbox>
        </div>
    </motion.div>
  )
}

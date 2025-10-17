import {motion} from 'framer-motion'
import type { countryCodeType, messageListType } from '../../types/type'
import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { IoChevronDown } from 'react-icons/io5'
import {countryCodes} from '../../utils/data'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../utils/store'
import {OrderSchema} from '../../utils/validation'
import { setOrder } from '../../store/newOrderSlice'

interface propType{
    setMessageList: React.Dispatch<React.SetStateAction<messageListType[]>>,
    setOptions: React.Dispatch<React.SetStateAction<{
      name: string;
      onClick: () => void;
    }[]>>,
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
    getSomethingElseMessage: (message: string) => void,
     ProceedToPayment(): void
}




export default function UserInfoInput(props:propType) {
  const {setMessageList,setOptions,setShowOptions,getSomethingElseMessage,ProceedToPayment} = props
  const dispatch = useDispatch()
  const [confirmed,setConfirmed] = useState(false)
  const [selectedCode,setSelectedCode] = useState<countryCodeType>(countryCodes[0])
  const [name,setName] = useState("")
  const [address,setAddress] = useState("")
  const [phoneNum,setPhoneNum] = useState("")
  const [email,setEmail] = useState("")
  const neworder = useSelector((state:RootState)=>state.newOrder.newOrder)
  
  function SubmitInfo(){
    if (!neworder) return console.log("No order found")
    const payload = {
      name:name,
      address:address,
      email:email,
      phone_number:selectedCode.val+phoneNum,
      items:neworder.items
    }
  

  const {error,value} = OrderSchema.validate(payload)
    if (error){
      const newMessage = {type:"message",next:()=>{}, sender:"bot-error",content:[error.message]}
      setMessageList((prev)=>[...prev, newMessage ])
      return
    }
    setShowOptions(false)
    dispatch(setOrder(value))
    setConfirmed(true)
    const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Name: ${value.name}`,`Delivery Address: ${value.address}`,`Phone number: ${value.phone_number}`]}
    setMessageList((prev)=>[...prev, newMessage ])
    setOptions([{name:'Proceed to payment', onClick:()=>ProceedToPayment()},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
    setShowOptions(true)
  }

  if (confirmed){
    return null
  }

  return (
    <div className="w-full justify-end flex">
      <motion.div initial={{opacity:0,x:50}} animate={{opacity:100, x:0}} transition={{duration:0.2, delay:0.5, ease:['easeOut']}}  className="flex gap-2 max-w-8/12 justify-end flex-col">
        <input type='text' placeholder='Full name' value={name} onChange={(e)=>setName(e.target.value)} className="p-2 border w-full rounded-sm cursor-pointer focus:bg-secondary-300/10 focus:outline-0" />
        <input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className="p-2 border w-full rounded-sm cursor-pointer focus:bg-secondary-300/10 focus:outline-0" />
        <input type='text' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} className="p-2 border w-full rounded-sm cursor-pointer focus:bg-secondary-300/10 focus:outline-0" />
        <div className='w-full flex gap-2'>
            <Listbox value={countryCodes[0]} onChange={(value)=>{setSelectedCode(value)}}>
              <div className="relative w-22">
                <ListboxButton className="w-full gap-1 focus:outline-0 border p-2 h-10 flex justify-between items-center rounded-sm cursor-pointer">
                  <p>{selectedCode.flag}</p>
                  <p>{selectedCode.val}</p>
                  <IoChevronDown />
                </ListboxButton>

                <ListboxOptions className="absolute w-24 left-1/2 -translate-x-1/2 max-h-40 mt-1 py-2 overflow-y-auto scroll border flex flex-col text-center rounded-sm z-50 bg-primary shadow-lg">
                  {countryCodes.map((item, index) => (
                    <ListboxOption key={index} value={item} className={({ focus, selected }) => `w-full capitalize p-2 flex gap-2 cursor-pointer ${focus? 'bg-secondary-300/10' : selected ? 'bg-secondary-300/20' : '' }`} >
                      <p>{item.flag}</p>
                      <p>{item.val}</p>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>

          
          <input type='number' value={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)} placeholder='Phone number' className="p-2 border w-full rounded-sm cursor-pointer focus:bg-secondary-300/10 focus:outline-0" />

        </div>
        <div onClick={SubmitInfo} className="p-2 border select-none rounded-sm cursor-pointer hover:bg-secondary-300/10">
              Confirm
        </div>
      </motion.div>
    </div>
  )
}
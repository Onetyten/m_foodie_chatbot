import {motion} from 'framer-motion'
import type { FetchedOrderType } from '../../types/type'
import { useEffect, useRef, useState } from 'react'
import { Digital } from 'react-activity'
import { useDispatch } from 'react-redux'
import { clearPendingOrder } from '../../store/pendingOrderSlice'
import { ReceiptDownloaded } from './ReceiptDownloaded'
import { useReactToPrint } from "react-to-print";



interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:FetchedOrderType[]
    }
}

export default function OrderHandler(props:propType) {
  const {message} = props 
  const order = message.content[0]
  const dispatch = useDispatch()
  const [confirmed,setConfirmed] = useState(false)
  const [isTyping,setIsTyping] = useState(true)
  const [feedback,setFeedback] = useState("order checked")
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef:componentRef,
    documentTitle: `Mori cafe receipt-${order._id}`,
    // onAfterPrint: "",
  })


  useEffect(()=>{
    setIsTyping(true)
    setTimeout(()=>{
      setIsTyping(false)
    },1000)
  },[confirmed])

  function handleCancelOrder(){
    setConfirmed(true)
    setFeedback("Order cancelled")
    dispatch(clearPendingOrder(order.reference))
  }


  function handlePrintReceipt(){
    setConfirmed(true)
    setFeedback("Downloading receipt")
    console.log("Receipt printed")
    handlePrint()
  }

  if (!confirmed){
    return(
        <div className="w-full justify-end flex">
          <motion.div initial={{opacity:0,x:50}} animate={{opacity:100, x:0}} transition={{duration:0.2, delay:0.5, ease:['easeOut']}}  className="flex gap-2 max-w-8/12 justify-end">
            <div onClick={handleCancelOrder} className="p-2 text-nowrap border rounded-sm cursor-pointer hover:bg-secondary-300/10">
                  Cancel Order
            </div>
            <div onClick={handlePrintReceipt} className="p-2 text-nowrap border rounded-sm cursor-pointer hover:bg-secondary-300/10">
                  Print Receipt  
            </div>
             <div className="hidden">
              <ReceiptDownloaded ref={componentRef} order={order} />
            </div>

          </motion.div>
        </div>
    )
  }
  return (
      <div className='flex w-full flex-col gap-0.5 justify-end'>
          {!isTyping?
          (<div className=" flex justify-end items-center text-primary ">
              <p className='bg-secondary-200 text-white rounded-tr-none sm:text-sm text-xs p-2.5 px-4 sm:px-6 rounded-2xl capitalize' >
                  {feedback}
              </p>
          </div>):(
          <div className=" flex justify-end items-center text-primary ">
              <div className='bg-secondary-200 text-white p-2.5 px-6 rounded-2xl text-sm' >
                  <Digital/>  
              </div>
          </div>
          )}
      </div>
  )
}

                        
                       
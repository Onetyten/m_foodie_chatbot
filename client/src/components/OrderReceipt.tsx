/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"
import { Digital } from "react-activity"
import logoImg from '../assets/logo.gif'
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../utils/store"
import api from "../../utils/api"
import axios from "axios"
import type { FetchedOrderType, messageListType } from "../../types/type"
import { clearPendingOrder } from "../../store/pendingOrderSlice"

interface propType{
    setMessageList: React.Dispatch<React.SetStateAction<messageListType[]>>,
    message: messageListType
}

export default function OrderReceipt(props:propType) {
    const {setMessageList,message} = props
    const [added,setAdded] = useState(false)
    const references = useSelector((state:RootState)=>state.pendingOrders.pendingOrders)
    const messages:string[] = []
    const hasRun = useRef<boolean>(false)
    const dispatch = useDispatch()

    useEffect(()=>{

      if (hasRun.current) return;
      hasRun.current = true;
        if (references.length==0){
            messages.push("No pending order found")
            const newMessage = {type:"message", sender:"bot", next:()=>{}, content:messages}
            setMessageList((prev)=>[...prev,newMessage])
            setAdded(true)
            setTimeout(()=>{
                message.next()
            },2000)
            return 
        }

        async function fetchOrder() {
            try {
                const response = await api.post('/order/fetch', {references})
                if (response.data.success===false){
                    console.log(response.data.message)
                    return messages.push("Internal server error")
                }
                
                const orders:FetchedOrderType[] = response.data.data
                for (const order of orders) {
                    if (order.status=="pending"){
                        messages.push(`Order ${order._id} is still uncomfirmed`)
                    }
                    else{
                        if (order.paidAt) {
                            const formatted = new Date(order.paidAt).toLocaleString("en-US", {
                                dateStyle: "long",
                                timeStyle: "short",
                        })
                        messages.push(`Order ${order._id} paid at ${formatted} `)}
                        else{
                            messages.push(`Order ${order._id} paid for`)
                        }
                        dispatch(clearPendingOrder(order.reference))
                    }
                }
            }
            catch (error) {
                if (axios.isAxiosError(error)){
                    messages.push(error.response?.data.message||"Internal server error")
                }
                else{
                    messages.push("Internal server error")
                }
                console.log(error)
            }
            finally{
                const newMessage = {type:"message", sender:"bot", next:()=>{}, content:messages}
                setMessageList((prev)=>[...prev,newMessage])
                setAdded(true)
                setTimeout(()=>{
                    message.next()
                },2000)
            }
        }
        fetchOrder()

        return()=>{
            hasRun.current = true
        }
    },[])

    if (added){
        return null
    }

  return (
    <div className="max-w-8/12 flex gap-2 items-start">
        <div className='bg-secondary-100 min-w-10 size-10 rounded-full flex justify-center items-center'>
            <img src={logoImg} className="size-8" alt="" />
        </div>

            <div className=" flex justify-start items-center text-primary ">
                <div className='bg-secondary-100 p-2.5 px-6 rounded-2xl text-sm' >
                <Digital/>  
                </div>
            </div>
    </div>
  )
}
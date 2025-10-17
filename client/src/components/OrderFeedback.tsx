/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Digital } from "react-activity"
import logoImg from '../assets/logo.gif'
import {motion} from 'framer-motion'
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../utils/store"
import api from "../../utils/api"
import axios from "axios"
import { addPendingOrder } from "../../store/pendingOrderSlice"



export default function OrderFeedback() {
    const dispatch = useDispatch()
    const order = useSelector((state:RootState)=>state.newOrder.newOrder)
    const [added,setAdded] = useState(false)
    const [feedBack,setFeedback] = useState(`Pay`)

    useEffect(()=>{
        async function createOrder() {
            try {
                const response = await api.post('/order/create',order)
                if (response.data.success===false){
                    return console.log(response.data.message)
                }
                setFeedback("You will be redirected to your payment portal shortly")
                const data = response.data.data
                dispatch(addPendingOrder(data.reference))
                setTimeout(()=>{
                    window.location.href = data.authorization_url
                },1000)
            }
            catch (error) {
                if (axios.isAxiosError(error)){
                    setFeedback(error.response?.data.message)
                }
                else{
                    setFeedback("Internal server error")
                }
                console.log(error)
                
            }
            finally{
                setAdded(true)
            }
        }
        createOrder()
    },[])

  return (
    <div className="max-w-8/12 flex gap-2 items-start">
        <div className='bg-secondary-100 min-w-10 size-10 rounded-full flex justify-center items-center'>
            <img src={logoImg} className="size-8" alt="" />
        </div>
        {added?(
            <div className=" flex justify-start items-center text-primary ">
                <motion.p initial={{x:15, y:50, opacity:0}}  animate={{x:0,y:0,opacity:100}} transition={{duration:0.2}}  className='bg-secondary-100 p-2.5 px-6 rounded-2xl text-sm' >
                    {feedBack}
                </motion.p>
            </div>
        ):
        (
            <div className=" flex justify-start items-center text-primary ">
                <div className='bg-secondary-100 p-2.5 px-6 rounded-2xl text-sm' >
                <Digital/>  
                </div>
            </div>
        )}

    </div>
  )
}
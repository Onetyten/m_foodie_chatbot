import React, { useEffect, useState } from "react";
import { Spinner } from "react-activity";
import {motion} from 'framer-motion';
import type {FetchedOrderType, messageListType} from '../../types/type';
import { Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination ,Autoplay,EffectCoverflow,Navigation} from 'swiper/modules';
import api from "../../utils/api";
import axios from "axios";
import { HistoryReceipt } from "./HistoryReceipt";

interface propType{
    message:messageListType
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,
    setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>;
}

export default function ReceiptCarousel(props:propType) {
    const {message,setShowOptions,setMessageList} = props
    const [orderList,setOrderList] = useState<FetchedOrderType[]>([])
    const [fetched,setFetched] = useState(false)
    
    useEffect(()=>{
        if (fetched) return
        async function getOrderList() {
           try {
                setShowOptions(false)
                const response = await api.post('/order/fetch')
                if (response.data.success===false){
                    const newMessage = {type:"message",next:()=>{}, sender:"bot",content:["No history found"]}
                    return setMessageList((prev)=>[...prev, newMessage ])
                }
                setOrderList(response.data.data)
           }
           catch (error) {
            if (axios.isAxiosError(error)){
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[error.response?.data.message||"No history found"]}
                setMessageList((prev)=>[...prev, newMessage ])
                message.next()
            }
           }
           finally{
            setFetched(true)
            setShowOptions(true)
           }
        }
        getOrderList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[message.content[0]])

      if (orderList.length==0){
        if (fetched==false){
            return(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="flex flex-col justify-center items-center gap-2">
                <div className="w-full gap-2 grid grid-cols-1">
                    <div className="bg-muted/40 hidden sm:flex justify-center items-center w-full h-60 rounded-md">
                        <Spinner/>
                    </div>
                </div>
            </motion.div>
            )
        }
        else{
            return null
        }        
      }


  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="flex flex-col justify-center items-center gap-2">
            <Swiper slidesPerView={1} spaceBetween={6} loop={true} pagination={{clickable: true,}} modules={[Pagination,Autoplay,EffectCoverflow,Navigation]} autoplay={{delay:5000, disableOnInteraction:false}} coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: true}}  className="flex w-full h-[400px] gap-2 flex-wrap justify-center items-center">
                {orderList.map((item,index)=>{
                    return(
                        <SwiperSlide key={index} className='flex w-full pb-12 justify-center items-center'>
                            <HistoryReceipt order={item}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
    </motion.div>
  )
}

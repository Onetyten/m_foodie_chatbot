import React, { useEffect, useState } from "react";
import { Spinner } from "react-activity";
import {motion} from 'framer-motion';
import api from "../../utils/api";
import type {FoodType, messageListType} from '../../types/type';
import FoodCard from "./FoodCard";
import { Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination ,Autoplay,EffectCoverflow,Navigation} from 'swiper/modules';

interface propType{
    message:messageListType
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    onClick:(food:FoodType)=>void,
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>
}

export default function FoodCarousel(props:propType) {
    const {message,setLoading,onClick,setShowOptions} = props
    const [foodList,setFoodList] = useState<FoodType[]>([])
    useEffect(()=>{
        async function getFoodList() {
           try {
                setShowOptions(false)
                const response = await api.get(`/food/list/${message.content[0]}`)
                if (response.data.success == false) return
                setFoodList(response.data.data)
                message.next()
           }
           catch (error) {
            console.log(error)
           }
           finally{
            setLoading(false)
            setShowOptions(true)
           }
        }
        getFoodList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[message, message.content])
    

      if (foodList.length==0){
        return(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="flex flex-col justify-center items-center gap-2">
                <div className="flex w-full gap-2 flex-wrap justify-center">
                    <div className="bg-muted/40 flex justify-center items-center w-[186px] h-60 rounded-md">
                        <Spinner/>
                    </div>
                    <div className="bg-muted/40 flex justify-center items-center w-[186px] h-60 rounded-md">
                        <Spinner/>
                    </div>
                    <div className="bg-muted/40 flex justify-center items-center w-[186px] h-60 rounded-md">
                        <Spinner/>
                    </div>
                </div>
            </motion.div>
        )
      }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="flex flex-col justify-center items-center gap-2">
        <Swiper slidesPerView={3} spaceBetween={6} loop={true} pagination={{clickable: true,}} modules={[Pagination,Autoplay,EffectCoverflow,Navigation]} autoplay={{delay:5000, disableOnInteraction:false}} coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: true}}  className="flex w-full gap-2 flex-wrap justify-center items-center">
            {foodList.map((item,index)=>{
                return(
                    <SwiperSlide className='flex pb-12 justify-center items-center'>
                        <FoodCard key={index} food={item} onClick={onClick}/>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    </motion.div>
  )
}





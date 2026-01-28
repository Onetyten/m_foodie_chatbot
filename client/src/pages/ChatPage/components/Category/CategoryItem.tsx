import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'


interface propTypes{
    item: {name:string,value:string , imageUrls:string[]},
    index:number,
}

export default function CategoryItem(props:propTypes) {
    const {item,index} = props
    const delay = index * 1000
    const [canSwitch,setCanSwitch] = useState(false)
    const [imageIndex,setImageIndex] = useState(0)
    const navigate = useNavigate()

    useEffect(()=>{
        if (canSwitch) return
        setTimeout(()=>{
            setCanSwitch(true)
        },delay)
    },[canSwitch, delay])

    useEffect(()=>{
        if (!canSwitch) return
        const intervalId = setInterval(()=>{
            setImageIndex((prev)=>prev >= item.imageUrls.length-1?0:prev+1)
        },2000)

        return () => clearInterval(intervalId)

    },[canSwitch, item.imageUrls.length])

  return (
    <div className='flex flex-col w-full items-center gap-6'>
        <div onClick={()=>navigate(`/chat?category=${item.value}`)} className="bg-secondary-200 hover:shadow-xl shadow-secondary-100/10 cursor-pointer p-3 flex justify-center items-center max-w-full w-64 lg:w-full aspect-square flex-col overflow-hidden rounded-full">
            
            <div className='w-full h-full justify-center items-center flex hover:scale-110 transition-all duration-500'>  
                <img className="w-10/12 xl:w-8/12 2xl:w-1/2 object-contain rounded-full" src={item.imageUrls[imageIndex]} alt="" />  
            </div>
            
        </div>

        <div className="capitalize text-center text-background text-2xl font-medium">
            {item.name}
        </div>
    </div>


  )
}

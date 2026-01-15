import { useEffect, useState } from 'react'


interface propTypes{
    item: {name:string, imageUrls:string[]},
    index:number,
}


export default function CategoryItem(props:propTypes) {
    const {item,index} = props
    const delay = index * 1000
    const [canSwitch,setCanSwitch] = useState(false)
    const [imageIndex,setImageIndex] = useState(0)

    useEffect(()=>{
        if (canSwitch) return
        setTimeout(()=>{
            setCanSwitch(true)
        },delay)
    },[canSwitch, delay])

    useEffect(()=>{
        if (!canSwitch) return
        setInterval(()=>{
            setImageIndex((prev)=>prev >= item.imageUrls.length-1?0:prev+1)
        },2000)

    },[canSwitch, imageIndex, item.imageUrls.length])

  return (
    <div className='flex items-center gap-6'>
        <div className="bg-primary hover:shadow-xl shadow-secondary-100/10 cursor-pointer p-3 flex justify-center items-center flex-col size-60 overflow-hidden rounded-full">
            <div className='w-full h-full justify-center items-center flex hover:scale-110 transition-all duration-500'>  
                <img className="size-52 object-contain rounded-full" src={item.imageUrls[imageIndex]} alt="" />  
            </div>
            
        </div>

        <div className="capitalize text-center text-secondary-100 text-xl font-bold">
            {item.name}
        </div>
    </div>


  )
}

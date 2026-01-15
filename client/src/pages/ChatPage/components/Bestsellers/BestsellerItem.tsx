import patternImg from '@/assets/patterns/pattern.webp'
import { useState } from 'react'


interface propType{
    food:{name:string, price:number, calories:number, imageUrl:string},
}


export default function BestsellerItem({food}:propType) {

    const [scaleImageUp,setScaleImageUp] = useState(false)

  return (
    <div onMouseEnter={()=>setScaleImageUp(true)} onMouseLeave={()=>setScaleImageUp(false)} className="overflow-hidden hover:bg-secondary-200/20 hover:shadow-xl shadow-secondary-100/10 cursor-pointer p-3 flex justify-center items-center flex-col w-full h-96 gap-1 rounded-md relative" style={{backgroundImage:`url(${patternImg})`}}>
        <div className="w-24 h-16 font-bold text-lg gap-0.5 z-30 rounded-bl-2xl absolute bg-primary top-0 text-background flex justify-center items-center right-0">
            &#8358;{food.price}
        </div>
        <div className="flex-1 flex justify-center items-center text-center h-full w-full">
            <img className= {`${scaleImageUp?"size-56":"size-52"} transition-all duration-500 object-contain rounded-full`} src={food.imageUrl} alt="" />
        </div>
        <div className="font-medium text-primary capitalize text-center text-2xl">
            {food.name}
        </div>
        <div className="w-full text-muted text-md flex justify-center items-center">
            <p>{food.calories} cal</p>
        </div>
    </div>
  )
}

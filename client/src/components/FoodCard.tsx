import type { FoodType } from "../../types/type"
import patternImg from '../assets/patterns/pattern.webp'


interface propType{
    food:FoodType
    onClick:(food:FoodType)=>void
}

export default function FoodCard(props:propType) {
    const {food,onClick} = props
  return (
        <div onClick={()=>{onClick(food)}} className="overflow-hidden hover:bg-secondary-200/20 hover:shadow-xl shadow-secondary-100/10 cursor-pointer p-3 flex justify-center items-center flex-col w-[186px] h-72 gap-1 rounded-md relative" style={{backgroundImage:`url(${patternImg})`}}>
            <div className="w-16 h-10 font-bold text-md gap-0.5 z-30 rounded-bl-2xl absolute bg-secondary-100 top-0 text-background flex justify-center items-center right-0">
                &#8358;{food.price}
            </div>
            <div className="flex-1 flex justify-center items-center text-center h-full w-full">
                <img className="size-32 object-contain rounded-full" src={food.imageUrl} alt="" />
            </div>
            <div className="font-bold capitalize text-center text-lg">
                {food.name}
            </div>
            <div className="w-full font-bold text-md text-primary flex justify-center items-center">
                <p>{food.calories} cal</p>
            </div>
        </div>
  )
}

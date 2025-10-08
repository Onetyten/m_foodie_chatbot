import type React from "react"
import { MdOutlineClose } from "react-icons/md";
import type { messageListType } from "../../types/type";


interface propType{
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>
    items:messageListType[]
}


export default function FoodModal(props:propType) {
    const {setShowModal,items} = props
    const foodOnly = items.filter((food)=>food.type=="foodList")
    const lastFood = foodOnly[foodOnly.length]
    console.log(lastFood)


  return (
    <div className="absolute w-full z-50 h-full overflow-scroll bg-secondary-300/50 backdrop-blur-xs flex justify-center items-center">
        <div className="bg-primary relative p-3 rounded-md w-2xl h-[500px]">
            <MdOutlineClose className="absolute right-3 top-3 text-2xl cursor-pointer" onClick={()=>{setShowModal(false)}}/>
            <div className="flex w-full gap-2 flex-wrap justify-center items-center">
                {/* {lastFood[0].map((item,index)=>{
                    return(
                        <div key={index} className="bg-white hover:bg-background hover:shadow-xl shadow-secondary-300/10 cursor-pointer p-3 flex justify-center items-center flex-col w-[186px] h-60 rounded-md">
                            <div className="flex-1 flex justify-center items-center text-center h-full w-full">
                                <img className="size-40 object-contain rounded-md" src={item.imageUrl} alt="" />
                            </div>
                            <div className="font-squada text-center text-xl">
                                {item.name}
                            </div>
                        </div>
                    )
                })} */}
            </div>
        </div>

    </div>
  )
}

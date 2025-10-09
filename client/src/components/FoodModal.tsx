import type React from "react"
import { MdOutlineClose } from "react-icons/md";
import { useSelector } from "react-redux";
import type { RootState } from "../../config/store";


interface propType{
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}


export default function FoodModal(props:propType) {
    const foodList = useSelector((state:RootState)=>state.foodlist.list)
    const {setShowModal} = props
  return (
    <div className="absolute w-full z-50 h-full bg-secondary-300/50 backdrop-blur-xs flex justify-center items-center">
        <div className="absolute w-8/10 h-6/10 bg-primary p-6 flex flex-col rounded-md ">
            <div className="flex w-full justify-end ">
                <MdOutlineClose className=" text-2xl cursor-pointer" onClick={()=>{setShowModal(false)}}/>
            </div>
            <div className=" overflow-scroll rounded-md w-full h-full p-6 ">
                <div className="flex w-full gap-2 flex-wrap justify-center items-center">
                    {foodList.map((item,index)=>{
                        return(
                            <div key={index} className="bg-white overflow-hidden hover:bg-background hover:shadow-xl shadow-secondary-300/10 cursor-pointer p-3 flex justify-center items-center flex-col w-[186px] h-72 gap-1 rounded-md">
                                <div className="flex-1 flex justify-center items-center text-center h-full w-full">
                                    <img className="size-32 object-contain rounded-md" src={item.imageUrl} alt="" />
                                </div>
                                <div className="font-squada capitalize text-center text-2xl">
                                    {item.name}
                                </div>
                                <div className="w-full text-xs text-stone-500 flex justify-between items-center">
                                    <p>
                                        {item.calories} calories
                                    </p>
                                    <p className="p-2 text-secondary-100 font-squada text-xl">
                                        &#8358;{item.price}
                                    </p>
                                </div>
                            </div>
                        )
                    })} 
                </div>
            </div>

        </div>

    </div>
  )
}

import { FaCartShopping } from "react-icons/fa6";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";
import type { messageListType } from "../../../types/type";
import useListCart from "../../../hooks/useListCart";
import useGetElse from "../../../hooks/useGetElse";
import useSubcategory from "../../../hooks/useSubcategory";
import useFetchFoodList from "../../../hooks/useFetchFoodList";
import useFetchReceiptList from "../../../hooks/useFetchReceiptList";

interface propType{
    showButtons:boolean;
    messagelist:messageListType[];
    setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>;
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
    setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void;}[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean;
}

export default function QuickActions(props:propType) {
    const {showButtons,setMessageList,setShowOptions,setOptions,setLoading,loading} = props
    const {getCategory} = useSubcategory(setOptions,setMessageList,setShowOptions)
    const getSomethingElseMessage = useGetElse(setShowOptions,setMessageList,setOptions,getCategory)
    const CartList = useListCart(setMessageList,setShowOptions,setLoading,setOptions,getSomethingElseMessage)
    const fetchFoodList = useFetchFoodList(loading,setLoading,setMessageList,setShowOptions,setOptions,getSomethingElseMessage)
    const fetchReceiptList =  useFetchReceiptList(setMessageList)

  return (
    <div className={`${showButtons?"size-80":"size-0"} transition-all z-40 text-background duration-250 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-primary rounded-full flex`}>

        <div className={`w-full h-full left-1/2 top-1/2 ${showButtons?"flex":"hidden"} justify-center rounded-full -translate-x-1/2 -translate-y-1/2 absolute `}>
            <button onClick={()=>{fetchFoodList(`/food/list?random=true`,"Close your eyes...")}} className="flex items-center p-3 bg-secondary-200/40 hover:bg-secondary-200/60 select-none cursor-pointer h-20 gap-2 w-20 justify-center rounded-full flex-col absolute top-6">
                <GiPerspectiveDiceSixFacesRandom className="size-6" />
                <p className="text-xs">Random</p>
            </button>
            <button onClick={CartList} className="flex items-center p-3 bg-secondary-200/40 hover:bg-secondary-200/60 select-none cursor-pointer h-20 gap-2 w-20 justify-center rounded-full flex-col absolute top-1/2 -translate-y-15 left-6 ">
                <FaCartShopping className="size-5" />
                <p className="text-xs">View tab</p>
            </button>
            <button onClick={fetchReceiptList} className="flex items-center p-3 bg-secondary-200/40 hover:bg-secondary-200/60 select-none cursor-pointer h-20 gap-2 w-20 justify-center rounded-full flex-col absolute top-1/2 -translate-y-15 right-6 ">
                <GrHistory className="size-4" />
                <p className="text-xs">History</p>
            </button>
        </div>
    </div>
  )
}

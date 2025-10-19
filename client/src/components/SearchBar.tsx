import { useState } from "react";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import OutsideClickHandler from 'react-outside-click-handler';
import QuickActions from "./searchbar/QuickActions";
import type { messageListType } from "../../types/type";

interface propType{
    messagelist:messageListType[];
    setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>;
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
    setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void;}[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchBar(props:propType) {
  const {messagelist,setMessageList,setLoading,setOptions,setShowOptions} = props
  const [showButtons,setShowButtons] = useState(false)
  return (
    <div className="w-full flex justify-center items-center h-11 mb-2 xl:mb-6">
      <div className="mx-6 h-full flex gap-2 justify-between px-1 items-center w-full rounded-full bg-secondary-300/15">
        <div className="relative">


            <OutsideClickHandler onOutsideClick={() => setShowButtons(false)}>
              <div className="bg-primary hover:text-white p-2 rounded-full z-20 text-background relative">
                <BiSolidCoffeeBean onClick={()=>setShowButtons(!showButtons)} className="text-xl" />
              </div>
              <QuickActions showButtons={showButtons} messagelist={messagelist} setMessageList={setMessageList} setShowOptions={setShowOptions} setLoading={setLoading} setOptions={setOptions} />
            </OutsideClickHandler>
          

        </div>

        <input type="text" placeholder="Search order" className="w-full text-sm placeholder:text-muted h-full focus:outline-0 focus:bg-secondary-300/5 px-2" />

        <div className="bg-primary hover:text-white p-2 rounded-full text-background">
          <IoSend className="text-xl" />
        </div>
      </div>
    </div>
  )
}

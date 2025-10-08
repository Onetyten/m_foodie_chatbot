import { useState } from "react";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import OutsideClickHandler from 'react-outside-click-handler';



export default function SearchBar() {
  const [showButtons,setShowButtons] = useState(false)
  return (
    <div className="w-full flex justify-center items-center h-11 mb-6">
      <div className="mx-6 h-full flex gap-2 justify-between px-1 items-center w-full rounded-full bg-secondary-100/40">
        <div className="relative">


            <OutsideClickHandler onOutsideClick={() => setShowButtons(false)}>
              <div className="bg-secondary-100 hover:bg-secondary-100 p-2 rounded-full z-20 text-primary relative">
                <BiSolidCoffeeBean onClick={()=>setShowButtons(!showButtons)} className="text-xl" />
              </div>
              <div className={`${showButtons?"size-80":"size-0"} transition-all duration-250 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-secondary-100/95 z-10 rounded-full`}> </div>
            </OutsideClickHandler>
          

        </div>

        <input type="text" placeholder="Search order" className="w-full text-sm placeholder:text-muted h-full focus:outline-0 focus:bg-secondary-100/10 px-2" />

        <div className="bg-secondary-100 hover:bg-secondary-200 p-2 rounded-full text-primary">
          <IoSend className="text-xl" />
        </div>
      </div>
    </div>
  )
}

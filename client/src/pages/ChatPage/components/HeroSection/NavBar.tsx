import logoImg from "@/assets/logo.gif"
import { HiMenu,HiX } from "react-icons/hi";
import { FaGithub,FaWhatsapp } from "react-icons/fa"
import { IoMail,IoCallSharp } from "react-icons/io5"
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import OutsideClickHandler from 'react-outside-click-handler';

const navLinks = [
    {name:"Order", url:"/chat"},
    {name:"Product", url:"/chat"},
]

const IconLinks = [
    {icon:FaGithub, url:"https://github.com/Onetyten/Mori-Cafe"},
    {icon:IoMail, url:"mailto:labaekaabdulrazaq@gmail.com"},
    {icon:IoCallSharp, url:"tel:+2349155073769"},
    {icon:FaWhatsapp, url:"https://wa.me/+2349155073769"},
    {icon:FaXTwitter, url:"https://x.com/Onetyten"},
]

export default function NavBar() {
    const [showMenu,setShowMenu] = useState(false)
  return (
    <div className="flex w-full px-0 sm:px-[15%] justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="bg-primary size-12 justify-center flex items-center rounded-full">
                <img src={logoImg} className="size-9" alt="" />
            </div>
            <div className="text-primary capitalize text-2xl font-squada">
                Mori café
            </div>
        </div>
        
        <div className="flex lg:hidden relative">
            {showMenu?(
                <HiX onClick={()=>setShowMenu(false)} size={32} className={`text-background z-20`}/>

            ):(
                <HiMenu onClick={()=>setShowMenu(!showMenu)} size={32} className={`text-primary z-20 `}/>
            )}
            

            {showMenu && (
                <OutsideClickHandler onOutsideClick={()=>setShowMenu(false)}> 
                    <div className="flex flex-col justify-between h-72 w-60 max-w-[50vw] rounded-md -right-4 -top-4 p-4 bg-primary/70 absolute backdrop-blur-xs z-10">
                        <div className="flex flex-col text-background gap-2 w-full">
                            {navLinks.map((item,index)=> <a href={item.url} key={index} className=" w-full hover:text-white">{item.name}</a>)}
                            <button className="w-full hover:text-white text-left cursor-pointer">Download</button>
                        </div>

                        <div className="flex flex-row text-background hover:text-white gap-1 justify-between">
                            {IconLinks.map((item,index)=>
                                <a key={index} href="" className="hover:text-secondary-100">
                                    <item.icon size={25}/>
                                </a>)
                            }   
                        </div>
                    </div>
                </OutsideClickHandler>

            )}
            
        </div>


        <div className="lg:flex hidden xl:gap-6 gap-4 font-light text-primary items-center">
            {navLinks.map((item,index)=> <a href={item.url} key={index} className="hover:text-secondary-100">{item.name}</a>)}
            <button className="hover:text-secondary-100">Download</button>
            <a href="https://github.com/Onetyten/Mori-Cafe" className="hover:text-secondary-100">
                <FaGithub size={25}/>
            </a>
        </div>
    </div>
  )
}

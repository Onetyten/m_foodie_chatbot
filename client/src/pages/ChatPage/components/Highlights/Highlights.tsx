import { useEffect, useState } from "react";
import ScreenshotImage from "@/assets/Homepage/Screenshot.webp"


const highLightData = [
  {
    name: "Welcome to Mori Cafe",
    desc: "Experience a seamless, modern coffee ordering app with a friendly chatbot-style interface designed just for you.",
  },
  {
    name: "Order Without Limits",
    desc: "Browse our full menu and place orders anytime, anywhere.",
  },
  {
    name: "Customize Your Order",
    desc: "Add your favorite extras, choose sizes, and make every cup perfect.",
  },
  {
    name: "Interactive Map",
    desc: "Find nearby Mori Cafe locations instantly with real-time maps.",
  },
  {
    name: "Pay Within the App",
    desc: "Secure, fast, and convenient payment directly from your phone.",
  },
  {
    name: "Track Your Orders",
    desc: "View past orders, receipts, and favorite items in one place.",
  },
  {
    name: "Intuitive UI",
    desc: "Navigate effortlessly with a smooth, responsive interface that just feels right.",
  },
  {
    name: "Loyalty & Rewards",
    desc: "Earn points with every purchase and unlock exclusive perks.",
  },
];



export default function Highlights() {
  const [index,setIndex] = useState(0)
  
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            setIndex((prev)=>prev >= highLightData.length-1?0:prev+1)
        },5000)
        return () => clearInterval(intervalId)
    },[])

  return (
    <div className="w-full flex justify-between items-start bg-background to-secondary-200 gap-16 sm:py-32 px-6 sm:px-[15%] p-14">
      
        <div className="flex flex-col gap-8 items-start ">
          <p className="text-4xl sm:text-5xl font-reader uppercase text-white"> {highLightData[index].name.split(" ")[0]} <span className="text-primary"> {highLightData[index].name.split(" ").slice(1).join(" ")} </span></p>
          <div className="text-secondary-100 font-light max-w-xl gap-2 flex flex-col">
              <p>{highLightData[index].desc}</p>
          </div>
          
          <a href="https://github.com/Onetyten/Mori-Cafe/releases/download/v1.0.0/Mori.Cafe.v1.0.0.apk" className="bg-primary p-3 rounded-md cursor-pointer hover:bg-secondary-100 text-base sm:text-lg text-white">
              Download
          </a>
      </div>

      <div className="pt-36">
        <img src={ScreenshotImage} alt="" className="w-80" />
      </div>
    </div>
  )
}
 
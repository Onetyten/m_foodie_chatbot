import { Suspense, useState } from "react";
import ScreenshotImage from "@/assets/Homepage/Screenshot.webp"
import { Canvas } from "@react-three/fiber";
import PhoneModel from "./PhoneModel";
import sectionDivider from "../../../../assets/svg/section-2-intro-divder.svg"

const highLightData = [
  {
    name: "Welcome to Mori Cafe",
    desc: "Experience a seamless, modern coffee ordering app with a friendly chatbot-style interface designed just for you.",
    videoUrl:"/Videos/highlights/intro-sequence.webm"
  },
  {
    name: "Order Without Limits",
    desc: "Browse our full menu and place orders anytime, anywhere.",
    videoUrl:"/Videos/highlights/order-sequence.webm"
  },
  {
    name: "Customize Your Order",
    desc: "Add your favorite extras, choose sizes, and make every cup perfect.",
    videoUrl:"/Videos/highlights/customise-sequence.webm"
  },
  {
    name: "Interactive Map",
    desc: "Find nearby Mori Cafe locations instantly with real-time maps.",
    videoUrl:"/Videos/highlights/map-sequence.webm"
  },
  {
    name: "Pay Within the App",
    desc: "Secure, fast, and convenient payment directly from your phone.",
    videoUrl:"/Videos/highlights/payment-sequence.webm"
  },
  {
    name: "Track Your Orders",
    desc: "View past orders, receipts, and favorite items in one place.",
    videoUrl:"/Videos/highlights/receipt-sequence.webm"
  },
  {
    name: "Intuitive UI",
    desc: "Navigate effortlessly with a smooth, responsive interface that just feels right.",
    videoUrl:"/Videos/highlights/action-sequence.webm"
  },
  {
    name: "Loyalty & Rewards",
    desc: "Earn points with every purchase and unlock exclusive perks.",
    videoUrl:"/Videos/highlights/action-sequence.webm"
  },
];


 
export default function Highlights() {
  const [index,setIndex] = useState(0)


  return (
    <section className="w-full section min-h-screen z-10 relative  bg-secondary-200 flex justify-between items-start to-secondary-200 gap-16 sm:pt-20 sm:pb-20 px-6 sm:px-[15%] p-14">
      
        <img src={sectionDivider} alt="" className="object-cover left-0 z-20 absolute bottom-full h-auto w-screen" />

        <div className="flex flex-1 flex-col gap-8 items-start ">
          <p className="text-4xl sm:text-5xl font-reader uppercase text-white"> {highLightData[index].name.split(" ")[0]} <span className="text-secondary-100"> {highLightData[index].name.split(" ").slice(1).join(" ")} </span></p>
          <div className="text-secondary-100 font-normal max-w-xl gap-2 flex flex-col">
              <p>{highLightData[index].desc}</p>
          </div>
          
          <a href="https://github.com/Onetyten/Mori-Cafe/releases/download/v1.0.0/Mori.Cafe.v1.0.0.apk" className="bg-primary p-3 rounded-md cursor-pointer hover:bg-secondary-100 text-base sm:text-lg text-white">
              Download Mobile App
          </a>
      </div>

      <div className="flex-1">
        <Suspense fallback={
            <div className="h-[90dvh] justify-center flex w-full"><img src={ScreenshotImage} alt="" className="pt-36 w-80" /></div>
          }>
          <div className="h-[90dvh] justify-center flex w-full relative">
            <Canvas className="w-full h-full">
              <ambientLight intensity={2}/>
              <directionalLight intensity={3} position={[5, 5, 5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/>
              <PhoneModel highlightData={highLightData} index={index} setIndex={setIndex}/>
            </Canvas>
          </div>
        </Suspense>
        
      </div>
      <div className="overlay absolute inset-0 bg-muted/0 pointer-events-none"></div>
    </section>
  )
}
 
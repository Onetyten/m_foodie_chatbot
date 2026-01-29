import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import PhoneModel from "./PhoneModel";
import sectionDivider from "../../../../assets/svg/section-2-intro-divder.svg"
import coffeeMug from "@/assets/floral/coffee-mug.png"
import coffeeBean from "@/assets/floral/coffee-bean.png"
import { highLightData } from "../../../../data/data";

export default function Highlights({ onSectionReady,setLoadedVideos }: { onSectionReady?: () => void,setLoadedVideos:React.Dispatch<React.SetStateAction<number>> }) {
  const [index,setIndex] = useState(0)
  const [modelReady, setModelReady] = useState(false)

  useEffect(() => {
    if (modelReady && onSectionReady) {
      onSectionReady()
    }
  }, [modelReady, onSectionReady])

  return (
    <section className="w-full flex-col md:flex-row section min-h-screen z-10 relative bg-secondary-200 flex justify-center md:items-start items-center flex-wrap gap-4 sm:pt-20 sm:pb-20 px-6 sm:px-[5%] lg:px-[10%] p-14">

        <img src={coffeeMug} className="hidden sm:flex size-10/12 sm:size-6/12 opacity-40 -z-10 absolute object-contain -left-4/12 sm:-left-2/12 -top-[5%] scale-25 rotate-12"/>
        
        <img src={coffeeBean} className="hidden sm:flex size-10/12 sm:size-6/12 opacity-40 -z-10 absolute object-contain -left-3/12 sm:left-1/12 sm:bottom-[20%] -bottom-36 scale-25 rotate-12"/>

        <img src={coffeeBean} className="hidden sm:flex size-8/12 sm:size-5/12 opacity-40 -z-10 absolute object-contain -left-4/12 sm:-left-1/12 sm:bottom-0 -bottom-36 scale-25 rotate-12"/>
        
        <img src={sectionDivider} alt="" className="object-cover left-0 z-20 absolute bottom-full h-auto w-screen" />

        <div className="flex-shrink-0 flex flex-col gap-6 ">
          <p className="text-4xl sm:text-5xl font-reader uppercase text-white"> {highLightData[index].name.split(" ")[0]} <span className="text-secondary-100"> {highLightData[index].name.split(" ").slice(1).join(" ")} </span></p>

          <div className="text-secondary-100 font-normal max-w-xl gap-2 flex flex-col">
              <p>{highLightData[index].desc}</p>
          </div>
          
          <a href="https://github.com/Onetyten/Mori-Cafe/releases/download/v1.0.0/Mori.Cafe.v1.0.0.apk" className="bg-primary p-3 rounded-md w-fit cursor-pointer hover:bg-secondary-100 text-base sm:text-lg text-white">
              Download Mobile App
          </a>
        </div>

      <div className="md:min-w-lg max-w-full md:flex-shrink-0">
        <Suspense fallback={null}>
          <div className="h-[90dvh] justify-start flex w-full relative">
            <Canvas className="w-full h-full">
              <ambientLight intensity={2}/>
              <directionalLight intensity={3} position={[5, 5, 5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/>
              <PhoneModel setLoadedVideos = {setLoadedVideos} highlightData={highLightData} index={index} onModelReady={() => setModelReady(true)} setIndex={setIndex}/>
            </Canvas>
          </div>
        </Suspense>
        
      </div>
      <div className="overlay absolute inset-0 bg-muted/0 pointer-events-none"></div>
    </section>
  )
}
 
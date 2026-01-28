import { useEffect } from "react";
import Bestsellers from "../ChatPage/components/Bestsellers/Bestsellers";
import Category from "../ChatPage/components/Category/Category";
import Footer from "../ChatPage/components/Footer/Footer";
import IntroPage from "../ChatPage/components/HeroSection/IntroPage";
import Highlights from "../ChatPage/components/Highlights/Highlights";
import OurCafe from "../ChatPage/components/OurCafe/OurCafe";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)



export default function Home() {

  useEffect(()=>{
    const mm = gsap.matchMedia();
    mm.add("(min-width:768px)",()=>{
      const sections = document.querySelectorAll(".section")
        sections.forEach((section,i)=>{
          if (i===sections.length-1) return
          ScrollTrigger.create({
            trigger:section,
            start:"top top",
            end:"bottom top",
            pin:true,
            pinSpacing:false
          })

          const nextOverlay = sections[i].querySelectorAll(".overlay")
          if (nextOverlay){
            gsap.to(
              nextOverlay,{
                backgroundColor:"#4f4849",
                ease:"none",
                scrollTrigger:{
                  trigger:sections[i+1],
                  start:"top bottom",
                  end:"bottom top",
                  scrub:true
                }
              }
            )
          }

        })

    })
    

    return ()=> ScrollTrigger.getAll().forEach(t=>t.kill())
  },[])

  return (
    <div className="flex flex-col relative overflow-x-hidden sm:text-lg justify-center items-center" >
        <IntroPage/>
        <Highlights/>
        <Category/>
        <Bestsellers/>
        <OurCafe/>
        <Footer/>

    </div>
  )
}

import { useEffect, useState } from "react";
import IntroPage from "../ChatPage/components/HeroSection/IntroPage";
import Highlights from "../ChatPage/components/Highlights/Highlights";
import Category from "../ChatPage/components/Category/Category";
import Bestsellers from "../ChatPage/components/Bestsellers/Bestsellers";
import OurCafe from "../ChatPage/components/OurCafe/OurCafe";
import Footer from "../ChatPage/components/Footer/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)


export default function PageContent({ setLoadedVideos, onReady}: { onReady: () => void,setLoadedVideos:React.Dispatch<React.SetStateAction<number>> }) {
    const [highlightsReady, setHighlightsReady] = useState(false)

    useEffect(() => {
    if (highlightsReady) {
        onReady();
    }
    }, [highlightsReady, onReady]);

//     useEffect(()=>{
//         const mm = gsap.matchMedia();
//         mm.add("(min-width:768px)",()=>{
//         const sections = document.querySelectorAll(".section")
//             sections.forEach((section,i)=>{
//             if (i===sections.length-1) return
//             ScrollTrigger.create({
//                 trigger:section,
//                 start:"top top",
//                 end:"bottom top",
//                 pin:true,
//                 pinSpacing:false
//             })
//             const nextOverlay = sections[i].querySelectorAll(".overlay")
//             if (nextOverlay){
//                 gsap.to(
//                 nextOverlay,{
//                     backgroundColor:"#4f4849",
//                     ease:"none",
//                     scrollTrigger:{
//                     trigger:sections[i+1],
//                     start:"top bottom",
//                     end:"bottom top",
//                     scrub:true
//                     }})
//             }})
//         })
//     return ()=> ScrollTrigger.getAll().forEach(t=>t.kill())
//   },[])

    return (
        <div className="flex flex-col relative overflow-x-hidden sm:text-lg justify-center items-center" >
            <IntroPage/>
            <Highlights setLoadedVideos = {setLoadedVideos} onSectionReady={() => setHighlightsReady(true)}/>
            <Category/>
            <Bestsellers/>
            <OurCafe/>
            <Footer/>
        </div>
    )
}

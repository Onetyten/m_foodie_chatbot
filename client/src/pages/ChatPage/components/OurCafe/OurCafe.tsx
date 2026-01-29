import deliveryImg from "@/assets/Homepage/delivery.apng"
// import {useGSAP} from '@gsap/react'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import sectionDivider from "../../../../assets/svg/section-5-intro-divder.svg"



export default function OurCafe() {
    // useGSAP(() => {
    //     const mm = gsap.matchMedia()
    //     mm.add("(max-width:1279px)", () => {
    //         gsap.set("#delivery-img", { xPercent: 0, willChange: "transform" })
    //         gsap.set("#fade-text", { opacity: 1 })
    //         gsap.timeline({
    //         scrollTrigger: { trigger: "#fade-text", once: true, start: "top 100%"} })
    //     })

    //     mm.add("(min-width:1280px)", () => {
    //         gsap.set("#delivery-img", { xPercent: 100, willChange: "transform", force3D: true })
    //         gsap.set("#fade-text", { opacity: 0 })
    //         gsap.timeline({
    //         scrollTrigger: { trigger: "#our-cafe-section", once: true, start: "top 85%"} })
    //         .to("#delivery-img", { xPercent: 0, duration: 2, ease: "power3.out" })
    //         .to("#fade-text", { opacity: 1, duration: 0.8 }, "-=0.6")
    //     })
    // }, [])

  return (
    <div id="our-cafe-section" className="w-full z-40 section relative flex xl:flex-row flex-col-reverse bg-secondary-200 pb-36 px-6 sm:px-[15%] justify-between items-start gap-12 xl:gap-2 p-14">

        <img src={sectionDivider} alt="" className="object-cover left-0 z-20 absolute bottom-full h-auto w-screen" />

        <div className= "w-full xl:w-8/12 2xl:w-1/2 flex justify-end h-full">
            <img alt="" id="delivery-img" src={deliveryImg} className="w-full object-contain sm:w-1/2 xl:w-full h-full"/>
        </div>

        <div id="fade-text" className="flex flex-col gap-8 items-start ">
            <p className="text-4xl sm:text-5xl font-reader text-white">OUR <span className="text-primary">CAFÉ</span></p>
            <div className="text-secondary-100 font-light gap-2 flex flex-col">
                <p>Not just your average coffee. Not just your average café.</p>
                <p>Daily home delivery from 7:30am - 6:00pm.</p>
            </div>
            <a href="/chat" className="bg-primary p-2 px-5 rounded-md cursor-pointer hover:bg-secondary-100 text-base sm:text-lg text-white">
                View Menu
            </a>
        </div>
        {/* <div className="overlay absolute inset-0 bg-muted/0 pointer-events-none" ></div> */}
    </div>
  )
}

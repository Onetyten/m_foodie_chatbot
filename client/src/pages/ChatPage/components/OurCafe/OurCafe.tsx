import deliveryImg from "@/assets/Homepage/delivery.apng"
import {motion} from "framer-motion"


export default function OurCafe() {
    const isXL = window.matchMedia('(min-width:1280px)').matches
  return (
    <div className="w-full flex xl:flex-row flex-col-reverse bg-gradient-to-b from-background to-90% to-secondary-200 pb-36 px-6 sm:px-[15%] justify-start items-start gap-12 xl:gap-2 p-14">

        <div className= "w-full xl:w-8/12 2xl:w-1/2 flex justify-end h-full">
            <motion.div initial={{x:"100%"}} whileInView={{x:0}} viewport={{ once: true }}  transition={{duration:2,ease:"easeInOut"}} className="w-full sm:w-1/2 xl:w-full h-full">
                    <img src={deliveryImg} alt="" className="w-full "/>
            </motion.div>
        </div>
        

        <motion.div initial={{opacity:0}} transition={{delay:isXL?1.5:0,duration:1}} whileInView={{opacity:1}} viewport={{ once: true }}  className="flex flex-col gap-8 items-start ">
            <p className="text-4xl sm:text-5xl font-reader text-white">OUR <span className="text-primary">CAFÉ</span></p>
            <div className="text-white text-base sm:text-xl gap-2 flex flex-col">
                <p>Not just your average coffee. Not just your average café.</p>
                <p>Daily home delivery from 7:30am - 6:00pm.</p>
            </div>
            <a href="/chat" className="bg-primary p-3 rounded-md cursor-pointer hover:bg-secondary-100 text-base sm:text-lg text-white">
                View Menu
            </a>
        </motion.div>
        
    </div>
  )
}

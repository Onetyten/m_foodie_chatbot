import deliveryImg from "@/assets/Homepage/delivery.apng"
import {motion} from "framer-motion"

export default function OurCafe() {
  return (
    <div className="w-full flex bg-gradient-to-b from-background to-90% to-secondary-200 pb-36 px-64 justify-between items-start p-14">

        <div className="w-1/2 h-full">
            <motion.div initial={{x:"150%"}} whileInView={{x:0}} viewport={{ once: true }}  transition={{duration:2,ease:"easeInOut"}} className="w-full h-full">
                    <img src={deliveryImg} alt="" className="w-full "/>
            </motion.div>
        </div>
        

        <motion.div initial={{opacity:0}} transition={{delay:1.5,duration:1}} whileInView={{opacity:1}} viewport={{ once: true }}  className="flex flex-col gap-8 items-start ">
            <p className="text-5xl font-reader text-white">OUR <span className="text-primary">CAFÉ</span></p>
            <div className="text-white text-xl gap-2 flex flex-col">
                <p>Not just your average coffee. Not just your average café.</p>
                <p>Daily home delivery from 7:30am - 6:00pm.</p>
            </div>
            <a href="/chat" className="bg-primary p-4 rounded-xl cursor-pointer hover:bg-secondary-100 text-xl text-white">
                View Menu
            </a>
        </motion.div>
        
    </div>
  )
}

import deliveryImg from "@/assets/Homepage/Delivery illustration.png"


export default function OurCafe() {
  return (
    <div className="w-full flex bg-gradient-to-b from-background to-90% to-secondary-200 py-36 px-64 justify-between items-start p-14">
        <img src={deliveryImg} alt="" className="w-1/2 "/>
        <div className="flex flex-col gap-8 items-start ">
            <p className="text-5xl font-reader text-white">OUR <span className="text-primary">CAFÉ</span></p>
            <div className="text-white text-xl gap-2 flex flex-col">
                <p>Not just your average coffee. Not just your average café.</p>
                <p>Daily home delivery from 7:30am - 6:00pm.</p>
            </div>
            <a href="/chat" className="bg-primary p-4 rounded-xl cursor-pointer hover:bg-secondary-100 text-xl text-white">
                View Menu
            </a>
        </div>
        
    </div>
  )
}

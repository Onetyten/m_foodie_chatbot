import { FaGithub,FaWhatsapp } from "react-icons/fa"
import { IoMail,IoCallSharp } from "react-icons/io5"
import { FaXTwitter } from "react-icons/fa6";
import patternImg from '@/assets/patterns/doodles.png'
import { useState, type FormEvent } from "react";
import sectionDivider from "../../../../assets/svg/section-6-intro-divder.svg"


const aboutUsData = {
    title:"About Us",
    links:[
        {name:"Our Company",url:""},
        {name:"Our Coffee",url:""},
        {name:"Contact Us",url:""},
        {name:"FAQ's",url:""},
    ]
}

const termData = {
    title:"Our Terms",
    links:[
        {name:"Privacy Policy",url:""},
        {name:"Returns & Refunds",url:""},
        {name:"Terms & Conditions",url:""},
        {name:"Shipping Policy",url:""},
    ]
}

const Links = [
    {icon:FaGithub, url:"https://github.com/Onetyten"},
    {icon:IoMail, url:"mailto:labaekaabdulrazaq@gmail.com"},
    {icon:IoCallSharp, url:"tel:+2349155073769"},
    {icon:FaWhatsapp, url:"https://wa.me/+2349155073769"},
    {icon:FaXTwitter, url:"https://x.com/Onetyten"},
]

const year = new Date().getFullYear()

export default function Footer() {
    const [email,setEmail] = useState("")
    const [success,setSuccess] = useState("")
    const [error,setError] = useState("")

    function AddToNewsLetter(e:FormEvent){
        e.preventDefault()
        setSuccess("")
        setError("")
        if (!email.trim()) {
            setError("Please enter your email address.")
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.")
            return
        }
        setSuccess("Thanks for subscribing to our newsletter.")
        setTimeout(()=>{setSuccess("")},2000)
    }
    

  return (
    <div className="w-full section z-50 min-h-[100dvh] bg-primary px-6 sm:px-[15%] flex flex-col justify-between items-start gap-16 py-32 relative">
        <img src={sectionDivider} alt="" className="object-cover left-0 z-20 absolute bottom-full h-auto w-screen" />

        <div className="absolute inset-0 z-0 opacity-20 bg-repeat" style={{ backgroundImage: `url(${patternImg})` }}/>

        <div className="w-full grid z-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 2xl:grid-cols-4 auto-cols-fr">
            <div className="flex  text-background font-light capitalize flex-col gap-4">
                <p className="text-white mb-2 sm:mb-4 font-medium text-xl "> {aboutUsData.title}  </p>
                {aboutUsData.links.map((item,index)=> <a key={index} className="hover:text-white" href={item.url}>{item.name}</a> )}  
            </div>
            
            <div className="flex text-wrap text-background font-light capitalize flex-col gap-4">
                <p className="text-white mb-2 sm:mb-4 font-medium text-xl "> Contact Us</p>

                <div className="flex flex-col">
                    <p className="text-white font-medium">Mori Café Office </p>
                    <a href="tel:+2349155073769" className="cursor-pointer hover:text-white" target="_blank" rel="noopener noreferrer">+234 9155073769 </a>
                </div>
                <div className="flex flex-col">
                    <p className="text-white font-medium text-wrap">Labaeka Adetayo </p>
                    <a href="https://onetyten.vercel.app/" className="cursor-pointer text-wrap hover:text-white" target="_blank">Owner & CEO</a>
                    <a href="mailto:labaekaabdulrazaq@gmail.com" className="cursor-pointer text-wrap hover:text-white lowercase" target="_blank" >labaekaabdulrazaq@gmail.com</a>
                </div>
                <div className="flex flex-col">
                    <p className="text-white font-medium">Commercial Orders</p>
                    <a href="mailto:info@moricafe.com" target="_blank" className="cursor-pointer hover:text-white lowercase">info@moricafe.com </a>
                </div>
            </div>

            <div className="flex  text-background font-light capitalize flex-col gap-4">
                <p className="text-white mb-2 text-wrap sm:mb-4 font-medium text-xl "> {termData.title}  </p>
                {termData.links.map((item,index)=> <a key={index} className="hover:text-white" href={item.url}>{item.name}</a> )}  
            </div>

            <form onSubmit={AddToNewsLetter} className="flex flex-col justify-start items-start gap-3">
                <p className="text-3xl font-medium text-white mb-2 sm:mb-4">GET UPDATED</p>

                <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full placeholder:text-secondary-200 text-secondary-100 focus:outline-0 p-4 h-12 bg-white rounded-md" />
                { success.length>0 && <p className="text-success text-sm">{success}</p> }
                { error.length>0 && <p className="text-warning text-sm">{error}</p> }
                
                <button className="rounded-md w-full h-12 bg-secondary-200 hover:shadow-lg cursor-pointer text-white" type="submit">Submit</button>
            </form>
        </div>

        <div className="flex flex-col items-start gap-3">
            <div className="flex flex-row gap-6">
                {Links.map((item,index)=> <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                    < item.icon className="text-white hover:text-lightergrey text-lg xl:text-2xl link-shadow " />
                </a> )}
            </div>

            <p className="text-white">
            &copy; {year} Mori Cafe LLC. All rights reserved 
            </p>
        </div>
        
    </div>
  )
}

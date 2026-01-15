import logoImg from "@/assets/logo.gif"
import { FaGithub } from "react-icons/fa"


export default function NavBar() {
  return (
    <div className="flex w-9/12 justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="bg-primary size-12 justify-center flex items-center rounded-full">
                <img src={logoImg} className="size-9" alt="" />
            </div>
            <div className="text-primary capitalize text-2xl font-squada">
                Mori café
            </div>
        </div>

        <div className="flex gap-6 font-light text-primary items-center">
            <a href="/chat" className="hover:text-secondary-100">Order</a>
            <a href="/chat" className="hover:text-secondary-100">Features</a>
            <a href="/chat" className="hover:text-secondary-100">Product</a>
            <button className="hover:text-secondary-100">Download</button>
            <a href="https://github.com/Onetyten/Mori-Cafe" className="hover:text-secondary-100">
                <FaGithub size={25}/>
            </a>
        </div>
    </div>
  )
}

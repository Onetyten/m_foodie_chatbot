import Video from "@/assets/videos/mori.webm"
import FloraImg from "@/assets/floral/flora.webp"
import coffeeCup from "@/assets/floral/coffee-cup.png"
import coffeeMug from "@/assets/floral/coffee-mug.png"


export default function Background() {
  return (
    <>
        <img src={FloraImg} className="size-6/12 opacity-40 -z-10 absolute object-contain -left-1/10 bottom-0"/>
        <img src={coffeeCup} className="size-6/12 opacity-60 -z-10 absolute object-contain -right-2/12 top-0 scale-50"/>
        <img src={coffeeMug} className="size-6/12 opacity-60 -z-10 absolute object-contain -right-2/12 -bottom-12 scale-25 rotate-12"/>

        <div className=" absolute top-0 bg-background/80 backdrop-blur-md -z-20 w-full h-full"></div>
        <video src={Video} autoPlay loop muted playsInline className={`absolute top-[50%] -z-30 -translate-y-1/2 w-[60%] object-contain`}/>
    </>
  )
}

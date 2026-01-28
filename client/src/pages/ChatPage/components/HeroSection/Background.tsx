import FloraImg from "@/assets/floral/flora.webp"
import coffeeCup from "@/assets/floral/coffee-cup.png"


export default function Background() {
  return (
    <>
        <img src={FloraImg} className="size-6/12 opacity-80 -z-10 absolute object-contain -left-2/12 -bottom-[15%] sm:bottom-[0%] xl:bottom-[13%]"/>
        <img src={coffeeCup} className="size-4/12 xl:size-6/12 opacity-60 -z-10 absolute object-contain -right-1/12 xl:-right-2/12 sm:top-0 scale-50"/>
        {/* <img src={coffeeMug} className=" size-10/12 sm:size-6/12 opacity-60 -z-10 absolute object-contain -right-4/12 sm:-right-1/12 sm:bottom-[12%] -bottom-36 scale-25 rotate-12"/> */}
    </>
  )
}

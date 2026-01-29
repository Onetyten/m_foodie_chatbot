import gsap from "gsap";
import { useEffect, useRef } from "react";
import logoImg from "../../assets/logo.png" 

interface LoadingScreenProps {
  progress: number;
  ready: boolean;
  onComplete?: () => void;
}

export function LoadingScreen({ progress, ready, onComplete }: LoadingScreenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, { width: `${progress}%`, duration: 0.2, ease: "power1.out"});
    }
  }, [progress]);

  useEffect(() => {
    if (!ref.current || !ready || triggered.current) return;
    triggered.current = true;
    gsap.to(ref.current, { x: -window.innerWidth, duration: 1, ease: "power2.inOut", onComplete});
  }, [ready, onComplete]);

  return (
    <div ref={ref} className="fixed inset-0 z-[9999] bg-primary flex-col gap-4 flex items-center justify-center text-white" >
        <img src={logoImg} alt="" className="size-36 animate-pulse" />
        <p className="mb-2 text-lg sm:text-2xl font-reader text-white">Welcome to Mori Cafe</p>
        <div className="w-64 sm:w-80 h-8 bg-white rounded-sm overflow-hidden mt-2">
          <div ref={barRef} className="h-full bg-secondary-100 w-0"></div>
        </div>
        <p className="text-base mt-1">{Math.round(progress)}%</p>
    </div>
  );
}

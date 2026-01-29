import { Suspense, useState } from "react";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import PageContent from "./PageContent";
import { highLightData } from "../../data/data";
import {useGlobalProgress} from "../../../hooks/useGlobalProgress"

export default function Home() {
  const [ready, setReady] = useState(false)
  const [loadedVideos, setLoadedVideos] = useState(0)
  const [showLoader, setShowLoader] = useState(true)
  const progress = useGlobalProgress(highLightData.length, loadedVideos)

  return (
    <>
      {showLoader && ( <LoadingScreen progress={progress} ready={ready} onComplete={() => setShowLoader(false)} />)}
      
      <Suspense fallback={null}>
        <PageContent setLoadedVideos = {setLoadedVideos} onReady={() => setReady(true)} />
      </Suspense>
    </>
  );
}

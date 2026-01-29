
import { useProgress } from "@react-three/drei";

export function useGlobalProgress(videoCount: number, loadedVideos: number) {
  const { progress } = useProgress();
  return Math.min(100, (progress * 0.7) + (loadedVideos / videoCount) * 30);
}

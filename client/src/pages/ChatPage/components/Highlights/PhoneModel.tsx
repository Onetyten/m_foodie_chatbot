/* eslint-disable react-hooks/exhaustive-deps */

import { useCursor,useGLTF } from "@react-three/drei";
import React, { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"; 

interface propTypes{
    highlightData: { videoUrl: string }[]
    index:number
    setIndex:React.Dispatch<React.SetStateAction<number>>
}


export default function PhoneModel({index,highlightData,setIndex}:propTypes) {
  
  const group = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)
  const animationRef = useRef<number | null>(null)
  const [rotationProgress, setRotationProgress] = useState(0)
  useCursor(hovered)
  const videoTextures = useRef<Map<string,THREE.VideoTexture>>(new Map())

  useEffect(()=>{
    highlightData.forEach(({videoUrl})=>{
      if (videoTextures.current.has(videoUrl)) return
      
      const video = document.createElement("video")
      video.src = videoUrl
      video.crossOrigin = "anonymous"
      video.loop = false
      video.muted = true
      video.playsInline = true
      video.preload = "auto"
      
      const texture = new THREE.VideoTexture(video)
      texture.flipY = false
      texture.colorSpace = THREE.SRGBColorSpace
      texture.generateMipmaps = false
      videoTextures.current.set(videoUrl,texture)
    })

    return ()=>{
      videoTextures.current.forEach((texture) => {
        const video = texture.image as HTMLVideoElement
        video.pause()
        video.src = ""
        texture.dispose()
      })
      videoTextures.current.clear()
    }
  },[])

  useEffect(() => {
    const currentTexture = videoTextures.current.get(highlightData[index].videoUrl)
    const currentVideo = currentTexture?.image as HTMLVideoElement | undefined
    if (currentVideo) {
      currentVideo.pause()
    }

    setIsAnimating(true)
    setRotationProgress(0)

    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const duration = 1500
      const t = Math.min(elapsed / duration, 1)
      setRotationProgress(t)

      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)

        if (currentVideo) {
          currentVideo.currentTime = 0
          currentVideo.play().catch(() => {})
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [index])

  useEffect(() => {
    const texture = videoTextures.current.get(highlightData[index].videoUrl)
    const video = texture?.image as HTMLVideoElement
    if (!video) return

    const duration = isFinite(video.duration) ? video.duration * 1000 + 3000 : 10000
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % highlightData.length)
    }, duration)

    return () => clearTimeout(timer)
  }, [index])

  const rotationAnimation = () => {
    const eased = Math.sin((rotationProgress * Math.PI) / 2)
    group.current.rotation.y = eased * Math.PI * 2
    group.current.rotation.x = 0
  }

  const { nodes, materials } = useGLTF('/3D model/s25/s25.gltf')

  useFrame((state) => {
    if (!group.current) return

    if (isAnimating) {
      rotationAnimation()
    } else {
      const { x } = state.pointer
      group.current.rotation.y = x * 0.1
    }
  })

  return (
    <group 
      ref={group} 
      dispose={null} 
      position={[0, 0, 4.858]} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="S_Pen_Ball_29" position={[-0.032, 0.025, 0]}>
                <group name="S_Pen_Tip_27" position={[-0.001, -0.102, 0]}>
                  <mesh name="Object_60" geometry={(nodes.Object_60 as THREE.Mesh).geometry} material={materials.S_Pen_Tip} />
                </group>
                <group name="S_Pen_Tip_2_28" position={[-0.001, -0.102, 0]}>
                  <mesh name="Object_62" geometry={(nodes.Object_62 as THREE.Mesh).geometry} material={materials.S_Pen_Tip_2} />
                </group>
                <group name="S_Pen_Body_25" position={[-0.001, -0.053, 0]}>
                  <mesh name="Object_56" geometry={(nodes.Object_56 as THREE.Mesh).geometry} material={materials.S_Pen_Body} />
                </group>
                <group name="S_Pen_Button_26" position={[-0.001, -0.053, 0]}>
                  <mesh name="Object_58" geometry={(nodes.Object_58 as THREE.Mesh).geometry} material={materials.S_Pen_Body} />
                </group>
                <mesh name="Object_54" geometry={(nodes.Object_54 as THREE.Mesh).geometry} material={materials.S_Pen_Ball} />
              </group>
              <group name="BackCam_Frame_1_0" position={[0, -0.081, 0.004]}>
                <mesh name="Object_4" geometry={(nodes.Object_4 as THREE.Mesh).geometry} material={materials.BackCam_Frame_1} />
              </group>
              <group name="Usb_1_1" position={[0, -0.081, 0.004]}>
                <mesh name="Object_6" geometry={(nodes.Object_6 as THREE.Mesh).geometry} material={materials.Usb_1} />
              </group>
              <group name="Usb_2_2" position={[0, -0.081, 0.004]}>
                <mesh name="Object_8" geometry={(nodes.Object_8 as THREE.Mesh).geometry} material={materials.Usb_2} />
              </group>
              <group name="BackCam_Frame_2_3" position={[0, -0.081, 0.004]}>
                <mesh name="Object_10" geometry={(nodes.Object_10 as THREE.Mesh).geometry} material={materials.BackCam_Frame_2} />
              </group>
              <group name="Antenna_Plastic_4" position={[0, -0.081, 0.004]}>
                <mesh name="Object_12" geometry={(nodes.Object_12 as THREE.Mesh).geometry} material={materials.Antenna_Plastic} />
              </group>
              <group name="Black_Hole_5" position={[0, -0.081, 0.004]}>
                <mesh name="Object_14" geometry={(nodes.Object_14 as THREE.Mesh).geometry} material={materials.Black_Hole} />
              </group>
              <group name="Rearcase_6" position={[0, -0.081, 0.004]}>
                <mesh name="Object_16" geometry={(nodes.Object_16 as THREE.Mesh).geometry} material={materials.Rearcase} />
              </group>
              <group name="Front_Cam_7" position={[0, -0.081, 0.004]}>
                <mesh name="Object_18" geometry={(nodes.Object_18 as THREE.Mesh).geometry} material={materials.Front_Cam} />
              </group>
              <group name="Front_Cam_Body_8" position={[0, -0.081, 0.004]}>
                <mesh name="Object_20" geometry={(nodes.Object_20 as THREE.Mesh).geometry} material={materials.Front_Cam_Body} />
              </group>
              <group name="Display_ActiveArea_9" position={[0, -0.081, 0.004]}>
                <mesh name="Object_22" geometry={(nodes.Object_22 as THREE.Mesh).geometry}>
                  <meshBasicMaterial map={videoTextures.current.get(highlightData[index].videoUrl)!} toneMapped={false} />
                </mesh>
              </group>
              <group name="Camera_Hole_Glass_10" position={[0, -0.081, 0.004]}>
                <mesh name="Object_24" geometry={(nodes.Object_24 as THREE.Mesh).geometry} material={materials.Camera_Hole_Glass} />
              </group>
              <group name="Bezel_11" position={[0, -0.081, 0.004]}>
                <mesh name="Object_26" geometry={(nodes.Object_26 as THREE.Mesh).geometry} material={materials.Bezel} />
              </group>
              <group name="BackCover_In_12" position={[0, -0.081, 0.004]}>
                <mesh name="Object_28" geometry={(nodes.Object_28 as THREE.Mesh).geometry} material={materials.BackCover_In} />
              </group>
              <group name="Flash_13" position={[0, -0.081, 0.004]}>
                <mesh name="Object_30" geometry={(nodes.Object_30 as THREE.Mesh).geometry} material={materials.Flash} />
              </group>
              <group name="SAMSUNG_LOGO_14" position={[0, -0.081, 0.004]}>
                <mesh name="Object_32" geometry={(nodes.Object_32 as THREE.Mesh).geometry} material={materials.SAMSUNG_LOGO} />
              </group>
              <group name="BackCam_15" position={[0, -0.081, 0.004]}>
                <mesh name="Object_34" geometry={(nodes.Object_34 as THREE.Mesh).geometry} material={materials.BackCam} />
              </group>
              <group name="BackCam_Body_16" position={[0, -0.081, 0.004]}>
                <mesh name="Object_36" geometry={(nodes.Object_36 as THREE.Mesh).geometry} material={materials.BackCAM_Body} />
              </group>
              <group name="BackCam_2_17" position={[0, -0.081, 0.004]}>
                <mesh name="Object_38" geometry={(nodes.Object_38 as THREE.Mesh).geometry} material={materials.BackCam_2} />
              </group>
              <group name="BackCover_Glass_18" position={[0, -0.081, 0.004]} scale={0.001}>
                <mesh name="Object_40" geometry={(nodes.Object_40 as THREE.Mesh).geometry} material={materials.BackCover_Glass} />
              </group>
              <group name="BackCam_Body_2_19" position={[0, -0.081, 0.004]}>
                <mesh name="Object_42" geometry={(nodes.Object_42 as THREE.Mesh).geometry} material={materials.BackCAM_Body_2} />
              </group>
              <group name="BackCam_Mt_20" position={[0, -0.081, 0.004]}>
                <mesh name="Object_44" geometry={(nodes.Object_44 as THREE.Mesh).geometry} material={materials.BackCam_Mt} />
              </group>
              <group name="BackCam_Mt_2_21" position={[0, -0.081, 0.004]}>
                <mesh name="Object_46" geometry={(nodes.Object_46 as THREE.Mesh).geometry} material={materials.BackCam_Mt_2} />
              </group>
              <group name="BackCam_Glass_22" position={[0, -0.081, 0.004]}>
                <mesh name="Object_48" geometry={(nodes.Object_48 as THREE.Mesh).geometry} material={materials.BackCam_Glass} />
              </group>
              <group name="Flach_Glass_23" position={[0, -0.081, 0.004]} scale={0.001}>
                <mesh name="Object_50" geometry={(nodes.Object_50 as THREE.Mesh).geometry} material={materials.Flash_Glass} />
              </group>
              <group name="BackCover_Glass_2_24" position={[0, -0.081, 0.004]} scale={0.001}>
                <mesh name="Object_52" geometry={(nodes.Object_52 as THREE.Mesh).geometry} material={materials.BackCover_Glass_2} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/3D model/s25/s25.gltf')
import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

export default function App() {
  function Box() {
    const meshRef = useRef()

    return (
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    )
  }

  return (
    <div className="w-[1024px] h-full mx-auto">
      <nav className="h-[48px]">
        <a href="/">keeb3d</a>
        <a href="/simulator">Simulator</a>
      </nav>
      <div className="flex">
        <h1>Content</h1>
        <div className="w-[450px] h-[450px] bg-black ml-auto">
          <Canvas className="test">
            <OrbitControls
              minPolarAngle={0}
              maxPolarAngle={(Math.PI)}
              enablePan={true}
              enableRotate={true}
              maxDistance={2}
              minDistance={2}
            />
            <ambientLight intensity={Math.PI / 2} />
            <Box />
          </Canvas>
        </div>
      </div>
    </div>
  )
}
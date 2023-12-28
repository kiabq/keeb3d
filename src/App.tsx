import './App.css'

import { useEffect, useRef } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import type { Mesh, Object3D } from 'three'

import Keycaps from './components/Keycaps'

function App() {
  function Plane(props: any) {
    const meshRef = useRef<Mesh>(null!);
    const camera = useThree((state) => state.camera);
    camera.position.y = 2;

    return (
      <mesh {...props} receiveShadow ref={meshRef}>
        <planeGeometry />
        <meshStandardMaterial color="gray" side={2} />
      </mesh>
    )
  }

  function Scene(props: any) {
    return (
      <>
        {props.children}
      </>
    )
  }

  return (
    <div id="canvas-container">
      <Canvas shadows>
        <PerspectiveCamera makeDefault aspect={16/9} near={0.001} position={[0, 15, 0]}/>
        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={(Math.PI)}
          enablePan={true}
          enableRotate={true}
          maxDistance={0.5}
        />
        <Scene>
          <fog attach="fog" args={['white', 2, 5]} />
          <ambientLight intensity={0.1} />
          <directionalLight castShadow color="white" position={[5, 5, 5]} />
          <hemisphereLight color="white" groundColor="black" intensity={0.5} />
          <Plane rotation={[Math.PI / 2, 0, 0]} scale={50} position={[0, -0.47, 0]} />
          <Keycaps />
        </Scene>
      </Canvas>
    </div>
  )
}

export default App
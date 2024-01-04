import { useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import type { Mesh } from 'three'

import { Keycaps } from '../components/Keycaps'

function App() {
  const testRef = useRef<any>(null!);

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
    const scene = useThree((state) => state.scene);

    return (
      <>
        {props.children}
      </>
    )
  } 

  return (
    <>
      <canvas height={300} id='canvas-test' ref={testRef}>
        <p>Sorry, your browser doesn't support canvas!</p>
      </canvas>
      <div id="canvas-container" className='w-full h-full'>
        <Canvas shadows>
          <PerspectiveCamera makeDefault aspect={16 / 9} near={0.001} position={[0, 15, 0]} />
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
            <Keycaps ref={testRef}/>
          </Scene>
        </Canvas>
      </div>
    </>
  )
}

export default App
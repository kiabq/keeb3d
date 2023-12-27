import './App.css'
import * as file from './assets/keymaps/numpad.json'

import { useEffect, useRef } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/Addons.js'

import type { Mesh, Object3D } from 'three'

type Keycap = {
  [key: number]: Object3D
}

function App() {
  const keys: Keycap = {};

  function Plane(props: any) {
    const meshRef = useRef<Mesh>(null!);
    const camera = useThree((state) => state.camera);
    camera.position.y = 2;

    return (
      <mesh {...props} receiveShadow ref={meshRef}>
        <planeGeometry />
        <meshStandardMaterial color="hotpink" side={2} />
      </mesh>
    )
  }

  function Sphere(props: any) {
    const meshRef = useRef<Mesh>(null!);

    return (
      <mesh {...props} ref={meshRef} scale={100}>
        <sphereGeometry />
        <meshStandardMaterial color="blue" side={2} />
      </mesh>
    )
  }
  
  function Keycaps() {
    const obj = useLoader(OBJLoader, '/keycap.obj');
    const layout = file.layout;

    for (let i = 0; i < layout.length; i++) {
      const key = layout[i];

      const clone = obj.clone();
      // clone.position.z = key.x / 20;
      clone.position.x = key.x / 52;
      keys[49 + i] = clone;
    }

    function handleKeyPress(e: KeyboardEvent) {
      if (keys[e.charCode] !== undefined) {
        keys[e.charCode].position.y = -0.01;
      }
    }

    useEffect(() => {
      window.addEventListener('keypress', handleKeyPress);
      window.addEventListener('keyup', (e) => {
        if (typeof keys[e.keyCode] !== 'undefined') {
          keys[e.keyCode].position.y = 0;
        }
      });

      return () => {
        window.removeEventListener('keypress', handleKeyPress);
      }
    }, [])

    return keys;
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
        <PerspectiveCamera makeDefault near={0.001} position={[0, 1, 0.05]} />
        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={(Math.PI)}
          enablePan={true}
          enableRotate={true}
          maxDistance={2}
          rotation={[0, 5, 5]}
        />
        <Scene>
          <ambientLight intensity={0.1} />
          <directionalLight castShadow color="white" position={[5, 5, 5]} />
          <hemisphereLight color="white" groundColor="black" intensity={0.5} />
          <Plane rotation={[Math.PI / 2, 0, 0]} scale={50} position={[0, -0.47, 0]} />
          <Sphere />
          {Object.values(Keycaps()).map((keycap: Object3D, i: number) => {
            return (
              <primitive object={keycap} key={i} />
            )
          })}
        </Scene>
      </Canvas>
    </div>
  )
}

export default App
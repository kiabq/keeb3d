import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import NavItem from "@/components/NavItem";

export default function App() {
  function Box() {
    const meshRef = useRef(null);

    return (
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    );
  }

  return (
    <div className="bg-gray h-full text-white">
      <div className="flex flex-col w-[800px] h-full mx-auto py-2 bg-gray">
        <nav className="flex items-center justify-between p-1 bg-white/50 backdrop-blur-md border-2 rounded-full">
          <NavItem href="/">Home</NavItem>
          {/*
          //? Why is this changing the height of the child elements?
          //! change later whatever I guess
        */}
          <div className="[&>*:nth-child(n+2)]:ml-4">
            <NavItem href="#about">About</NavItem>
            <NavItem href="/simulator">Simulator</NavItem>
          </div>
        </nav>
        <div className="flex mt-12">
          <div className="relative text-center">
            <h1 className="font-roboto font-semibold text-3xl">
              Ready to customize a keyboard?
            </h1>
            <a
              href="/simulator"
              className="bg-blue-400 inline-block py-3 px-6 mt-4 border-2 rounded-full"
            >
              Let's Go
            </a>
          </div>
          <div className="w-[400px] h-[400px] ml-auto border-2 drop-shadow-md border-white rounded-3xl hero-radial">
            <Canvas>
              <OrbitControls
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
                enablePan={false}
                enableRotate={true}
                maxDistance={2}
                minDistance={2}
              />
              <ambientLight intensity={Math.PI / 2} />
              <Box />
            </Canvas>
          </div>
        </div>
        <div className="my-4">
          <div className="flex flex-col h-auto">
            <button className="flex w-full h-3 hover:bg-neutral-400">
              <span className="h-[2px] my-auto bg-white w-full inline-block"></span>
            </button>
            <p>Lorem Ipsum</p>
          </div>
        </div>
        <div id="footer" className="mt-auto w-full my-4">
          <div className="flex items-center mb-2">
            <span className="block w-[5%] border-t-[1px]"></span>
            <p className="text-center w-[10%]">keeb3d</p>
            <span className="block w-[85%] border-t-[1px] ml-auto"></span>
          </div>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>GitHub</p>
          <p></p>
        </div>
      </div>
    </div>
  );
}

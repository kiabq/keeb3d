import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

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

  //! Move this at some point... kthx future me :)
  type NavItemProps = {
    children?: React.ReactNode;
    href?: string;
    className?: string;
  };

  function NavItem(props: NavItemProps) {
    return (
      <a {...props} className="hover:bg-red-500 rounded-xl px-2">
        {props.children}
      </a>
    );
  }

  return (
    <div className="w-[1024px] h-full mx-auto py-2">
      <nav className="flex items-center justify-between p-1 border-2 rounded-full">
        <NavItem href="/">Home</NavItem>
        {
          /*
          //? Why is this changing the height of the child elements?
          //! change later whatever I guess
          */
        }
        <div className="[&>*:nth-child(n+2)]:ml-4">
          <NavItem href="#about">About</NavItem>
          <NavItem href="/simulator">Simulator</NavItem>
        </div>
      </nav>
      <div className="flex mt-24">
        <h1>Content</h1>
        <div className="w-[450px] h-[450px] ml-auto border-2 drop-shadow-md border-neutral-400 rounded-3xl hero-radial">
          <Canvas>
            <OrbitControls
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
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
      <div id="about">
        <h1>ABOUT</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eos
          voluptas eaque odio officia. Quisquam excepturi repudiandae
          reprehenderit aliquid neque officia explicabo eum quia repellat
          cumque. Earum inventore alias nam?
        </p>
        <p>Dropdown</p>
        <p>Dropdown</p>
        <p>Dropdown</p>
        <p>Dropdown</p>
        <p>Dropdown</p>
        <p>Dropdown</p>
      </div>
      <div id="footer">
        <h1>FOOTER</h1>
      </div>
    </div>
  );
}

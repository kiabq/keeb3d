import { useEffect, forwardRef, ReactNode } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';
import type { Object3D } from 'three';
import * as THREE from 'three';

import * as info from '../assets/keymaps/60_loc.json';
//! Very important -- make a global map for QK_Keys
import * as key from '../assets/keymaps/60_map.json';

type Keycap = {
    [key: string]: Object3D
}


type Ref = React.MutableRefObject<HTMLCanvasElement>;
type Props = {
    children?: ReactNode
}

//? Attach individual keycaps to a ref? 
export const Keycaps = forwardRef<Ref, Props>(function Keycaps(props, ref) {
    let uvArray: any = null;
    const canvas = ref!.current;

    async function drawLines() {
        const ctx = canvas.getContext('2d');
        const canvasSize = 300;
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const scale = 200;

        ctx.fillStyle = "pink";
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        ctx.translate(canvas.width / 1.25, canvas.height / 2.5);
        ctx.scale(-1, 1);
        ctx.strokeStyle = "orange";
        ctx.fillStyle = "orange";
        ctx.font = "20px serif";
        
        ctx.moveTo(uvArray[15] * scale, uvArray[15 + 1] * scale);
        ctx.lineTo(uvArray[16] * scale, uvArray[16 + 1] * scale);
        ctx.stroke();

        ctx.moveTo(uvArray[16] * scale, uvArray[16 + 1] * scale);
        ctx.lineTo(uvArray[17] * scale, uvArray[17 + 1] * scale);
        ctx.stroke();

        ctx.moveTo(uvArray[17] * scale, uvArray[17 + 1] * scale);
        ctx.lineTo(uvArray[18] * scale, uvArray[18 + 1] * scale);
        ctx.stroke();
        ctx.fillText("Hello World!",-50,-50);
    }

    const keys: Keycap = {};
    const R1 = useLoader(OBJLoader, '/R1.obj');
    const R2 = useLoader(OBJLoader, '/R2.obj');
    const R3 = useLoader(OBJLoader, '/R3.obj');
    const R4 = useLoader(OBJLoader, '/R4.obj');
    const MOD125 = useLoader(OBJLoader, '/MOD125.obj');
    const MOD150 = useLoader(OBJLoader, '/MOD150.obj');
    const RSH275 = useLoader(OBJLoader, '/RSH275.obj');
    const SP65 = useLoader(OBJLoader, '/SP65.obj');
    const LSH225 = useLoader(OBJLoader, '/LSH225.obj');
    const K2 = useLoader(OBJLoader, '/K2.obj');
    const CAP175 = useLoader(OBJLoader, '/CAP175.obj');
    const R3GLTF = useLoader(GLTFLoader, '/R3.glb');
    const CASE = useLoader(GLTFLoader, '/case.glb');
    const layout = info.layout;
    const map = key.layers;
    const height = 0.019;
    const width = 0.019;

    let shift = 0;
    let prev = 0;

    for (let i = 0; i < layout.length; i++) {
        const key = layout[i];
        let obj: Object3D;
        let standard: Object3D;

        if (prev !== key.y) {
            shift = 0;
            prev = key.y;
        }

        if (key.y === 0) {
            standard = R4;
        } else if (key.y === 1) {
            standard = R3GLTF.scene;
            uvArray = standard.children[0].geometry.attributes.uv.array;

            drawLines().then(() => {
                const texture = new THREE.CanvasTexture(canvas);
                standard.traverse((child) => {
                    const object = child.children[0]; 

                    if (object !== undefined && object.isMesh) {
                        object.material = new THREE.MeshLambertMaterial({ map: texture, emissive: 0x000000 });
                    }
                })
            })
        } else if (key.y === 2) {
            standard = R2;
        } else {
            standard = R1;
        }

        switch (key.w) {
            case 1.25:
                obj = MOD125;
                break;
            case 1.5:
                obj = MOD150;
                break;
            case 1.75:
                obj = CAP175;
                break;
            case 2:
                obj = K2;
                break;
            case 2.25:
                obj = LSH225;
                break;
            case 2.75:
                obj = RSH275;
                break;
            case 6.5:
                obj = SP65;
                break;
            default:
                obj = standard;
                break;
        }

        const clone = obj.clone();
        clone.rotateY(Math.PI);
        clone.position.z = key.y * height;
        clone.position.x = ((key.x + (key.w - 1) / 2) * width) + shift;

        if (key.w > 1) {
            shift += (key.w - 1) * width;
        }

        clone.position.y = -0.0015 * key.y;
        if (key.y > 2) {
            clone.rotation.x = (Math.PI / 2) * 1.975;
        }

        //! please change... I beg of future me
        keys[map[i]] = clone;
    }
    
    const keycase = CASE.scene.clone();
    keycase.rotation.y = (Math.PI / 2) * 2;
    keycase.position.y = -0.011;
    keycase.position.x = 0.1325
    keycase.position.z = 0.0375;

    //TODO: Change mapping scheme of keys, right now it's just a simple iterator (not really versatile)

    function handleKeyDown(e: KeyboardEvent) {
        e.preventDefault();

        if (typeof keys[e.code] === 'undefined') return;
        keys[e.code].position.y -= 0.015;
    }

    function handleKeyUp(e: KeyboardEvent) {
        e.preventDefault();

        if (typeof keys[e.code] === 'undefined') return;
        keys[e.code].position.y = 0;
    }

    useEffect(() => {
        drawLines();

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyUp);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [])

    return (
        <>
            <primitive object={keycase} />
            {Object.values(keys).map((keycap: Object3D, i: number) => {
                return (
                    <primitive object={keycap} key={i} />
                )
            })}
        </>
    )
})
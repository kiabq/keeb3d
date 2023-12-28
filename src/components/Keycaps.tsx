import { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import type { Object3D } from 'three';

import * as info from '../assets/keymaps/60_loc.json';
//! Very important -- make a global map for QK_Keys
import * as key from '../assets/keymaps/60_map.json';

type Keycap = {
    [key: string]: Object3D
}

//? Attach individual keycaps to a ref? 
export default function Keycaps() {
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
            standard = R3;
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
    
        //! please change... I beg of future me
        keys[map[i]] = clone;
    }

    //TODO: Change mapping scheme of keys, right now it's just a simple iterator (not really versatile)

    function handleKeyDown(e: KeyboardEvent) {
        e.preventDefault();

        console.log(e.code);

        if (typeof keys[e.code] === 'undefined') return;
        keys[e.code].position.y = -0.01;
    }

    function handleKeyUp(e: KeyboardEvent) {
        e.preventDefault();

        if (typeof keys[e.code] === 'undefined') return;
        keys[e.code].position.y = 0;
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyUp);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [])

    return (
        <>
            {Object.values(keys).map((keycap: Object3D, i: number) => {
                return (
                    <primitive object={keycap} key={i} />
                )
            })}
        </>
    )
}
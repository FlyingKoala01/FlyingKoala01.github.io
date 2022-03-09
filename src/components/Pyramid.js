import { Scene } from 'three';
import { Canvas } from "react-three-fiber"
import './Pyramid.css';
import { BoxBufferGeometry } from 'three';
import { MeshLambertMaterial } from 'three';
import { OrbitControls } from "drei";
import { AmbientLight } from 'three';
import { SpotLight } from 'three';


function Box() {
    return (
        <mesh position={[0, 0, 0]}>
            <BoxBufferGeometry attach="geometry" />
            <MeshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    )
}

function Plane() {
    return (
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <BoxBufferGeometry attach="geometry" args={[100, 100]} />
            <MeshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    )
}

export default function Pyramid() {
    return (     
        <Canvas>
            <OrbitControls />
            <Stars />
            <AmbientLight intensity={0.5}/>
            <SpotLight position={[10, 15, 10]} angle={0.3} />
            <Box />
        </Canvas>
    )
}

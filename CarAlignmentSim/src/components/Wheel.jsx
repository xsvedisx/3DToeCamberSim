import { useRef, useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

export default function Wheel({
  toeDeg,
  camberDeg,
  url = "/models/wheel.stl",
  flip = false,
  ...rest
}) {
  const meshRef = useRef();
  const baseGeometry = useLoader(STLLoader, url);

  // Bake upright + inward/outward orientation once
  const geometry = useMemo(() => {
    const geom = baseGeometry.clone();
    geom.rotateX(Math.PI / 2); // stand wheel up
    geom.rotateY(flip ? -Math.PI / 2 : Math.PI / 2); // face inward
    geom.computeVertexNormals();
    return geom;
  }, [baseGeometry, flip]);

  // Live toe (about Y) and camber (about Z)
  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = THREE.MathUtils.degToRad(toeDeg);
    meshRef.current.rotation.z = THREE.MathUtils.degToRad(camberDeg);
  }, [toeDeg, camberDeg]);

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow {...rest}>
      <meshStandardMaterial color="#171717" metalness={0.5} roughness={0.5} />
    </mesh>
  );
}

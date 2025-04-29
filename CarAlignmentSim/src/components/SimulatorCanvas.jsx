import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Axle from "./Axle";

export default function SimulatorCanvas({
  leftToe,
  leftCamber,
  rightToe,
  rightCamber,
  activeView,
}) {
  const controlsRef = useRef();

  // Ändra kameraposition
  useEffect(() => {
    if (!controlsRef.current) return;
    const cam = controlsRef.current.object;
    switch (activeView) {
      case "top":
        cam.position.set(0, 25, 0);
        cam.up.set(0, 0, -1);
        break;
      case "front":
        cam.position.set(0, 0, -25);
        cam.up.set(0, 1, 0);
        break;
      case "rear":
        cam.position.set(0, 0, 25);
        cam.up.set(0, 1, 0);
        break;
    }
    cam.lookAt(0, 0, 0);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  }, [activeView]);

  return (
    <div className="canvas-wrapper">
      <Canvas shadows>
        <PerspectiveCamera
          makeDefault
          position={[0, 25, 0]}
          up={[0, 0, -1]}
          fov={5}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} castShadow />
        <Environment preset="warehouse" />
        <Axle
          leftToe={leftToe}
          leftCamber={leftCamber}
          rightToe={rightToe}
          rightCamber={rightCamber}
        />
        <mesh position={[0, -0.41, 0]} receiveShadow>
          <boxGeometry args={[2.8, 0.05, 1.5]} />
          <meshStandardMaterial color="#cacaca" />
        </mesh>
        <OrbitControls
          ref={controlsRef}
          rotateSpeed={0.8}
          enablePan
          makeDefault
        />
      </Canvas>
    </div>
  );
}

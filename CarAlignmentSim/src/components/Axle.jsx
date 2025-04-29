import { memo } from "react";
import Wheel from "./Wheel";

const BAR_LENGTH = 2; // hub-to-hub distance
const HUB_OFFSET = BAR_LENGTH * 0.5;

function Axle({
  leftToe,
  leftCamber,
  rightToe,
  rightCamber,
  y = 0, // ride-height
}) {
  return (
    <group position={[0, y, 0]}>
      {/* connecting bar */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, BAR_LENGTH, 16]} />
        <meshStandardMaterial color="#7a7a7a" metalness={1} roughness={0.1} />
      </mesh>

      {/* left wheel: inward facing */}
      <Wheel
        toeDeg={-leftToe}
        camberDeg={leftCamber}
        flip={false}
        position={[-HUB_OFFSET, 0, 0]}
      />

      {/* right wheel: outward facing */}
      <Wheel
        toeDeg={rightToe}
        camberDeg={-rightCamber}
        flip={true}
        position={[HUB_OFFSET, 0, 0]}
      />
    </group>
  );
}

export default memo(Axle);

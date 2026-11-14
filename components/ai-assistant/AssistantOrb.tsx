import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type OrbState = "idle" | "listening" | "thinking" | "responding";

interface AssistantOrbProps {
  state: OrbState;
  pointer: { x: number; y: number };
}

const orbColors: Record<OrbState, { core: string; glow: string; ring: string; particle: string }> = {
  idle: { core: "#328bff", glow: "#22d3ee", ring: "#55dfff", particle: "#b58cff" },
  listening: { core: "#31a2ff", glow: "#5cecff", ring: "#7deaff", particle: "#a7eaff" },
  thinking: { core: "#895cff", glow: "#a855f7", ring: "#b480ff", particle: "#5deaff" },
  responding: { core: "#4b8cff", glow: "#22d3ee", ring: "#a855f7", particle: "#d0b1ff" },
};

function OrbModel({ state, pointer }: AssistantOrbProps) {
  const core = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Group>(null);
  const palette = orbColors[state];
  const particlePositions = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const phi = Math.acos(-1 + (2 * (index + 0.5)) / 18);
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;
        const radius = 1.28 + (index % 3) * 0.08;
        return [
          Math.cos(theta) * Math.sin(phi) * radius,
          Math.cos(phi) * radius,
          Math.sin(theta) * Math.sin(phi) * radius,
        ] as [number, number, number];
      }),
    [],
  );

  useFrame(({ clock }, delta) => {
    if (!core.current || !rings.current || !particles.current) return;

    const active = state === "thinking" || state === "responding";
    const time = clock.elapsedTime;
    core.current.rotation.y += delta * (active ? 0.72 : 0.16);
    core.current.rotation.x = THREE.MathUtils.damp(core.current.rotation.x, pointer.y * 0.2, 4, delta);
    core.current.rotation.z = THREE.MathUtils.damp(core.current.rotation.z, -pointer.x * 0.18, 4, delta);
    const pulse = state === "thinking" ? 0.055 : state === "responding" ? 0.075 : 0.025;
    const scale = 1 + Math.sin(time * (active ? 4.2 : 1.8)) * pulse;
    core.current.scale.setScalar(scale);
    rings.current.rotation.x += delta * (state === "thinking" ? 0.65 : 0.12);
    rings.current.rotation.y -= delta * (state === "responding" ? 0.42 : 0.16);
    particles.current.rotation.y += delta * (state === "thinking" ? -0.5 : 0.08);
    particles.current.rotation.x = Math.sin(time * 0.25) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight color={palette.glow} intensity={4} distance={5} position={[0, 0, 1.4]} />
      <pointLight color={palette.ring} intensity={1.4} distance={4} position={[-1.4, 1.1, -0.8]} />
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[0.73, 4]} />
          <meshPhysicalMaterial
            color={palette.core}
            emissive={palette.core}
            emissiveIntensity={0.72}
            metalness={0.42}
            roughness={0.16}
            transmission={0.22}
            thickness={0.7}
            clearcoat={1}
          />
        </mesh>
        <mesh scale={1.13}>
          <icosahedronGeometry args={[0.73, 2]} />
          <meshBasicMaterial color={palette.glow} wireframe transparent opacity={0.22} />
        </mesh>
        <group ref={rings}>
          <mesh rotation={[0.72, 0.3, 0.2]}>
            <torusGeometry args={[1.03, 0.012, 8, 96]} />
            <meshBasicMaterial color={palette.ring} transparent opacity={0.86} />
          </mesh>
          <mesh rotation={[1.1, -0.6, 0.8]}>
            <torusGeometry args={[1.17, 0.008, 8, 96]} />
            <meshBasicMaterial color={palette.particle} transparent opacity={0.55} />
          </mesh>
        </group>
        <group ref={particles}>
          {particlePositions.map((position, index) => (
            <mesh key={index} position={position}>
              <sphereGeometry args={[index % 4 === 0 ? 0.035 : 0.022, 8, 8]} />
              <meshBasicMaterial
                color={index % 2 === 0 ? palette.particle : palette.glow}
                transparent
                opacity={0.82}
              />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
}

export default function AssistantOrb({ state, pointer }: AssistantOrbProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.65], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
    >
      <OrbModel state={state} pointer={pointer} />
    </Canvas>
  );
}

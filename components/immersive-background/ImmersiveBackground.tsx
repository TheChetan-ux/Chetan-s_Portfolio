import { ContactShadows, Environment, Lightformer, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import "./ImmersiveBackground.css";

function FrameGate({ active, fps }: { active: boolean; fps: number }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") invalidate();
    }, 1000 / fps);
    return () => window.clearInterval(interval);
  }, [active, fps, invalidate]);

  return null;
}

function WaveSurface({ mobile, reducedMotion }: { mobile: boolean; reducedMotion: boolean }) {
  const wave = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const mesh = wave.current;
    if (!mesh || reducedMotion) return;

    const positions = mesh.geometry.attributes.position;
    const time = clock.elapsedTime;
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      const height =
        Math.sin(x * 0.38 + time * 0.23) * 0.32 +
        Math.cos(y * 0.64 - time * 0.18) * 0.2 +
        Math.sin((x + y) * 0.22 + time * 0.14) * 0.13;
      positions.setZ(index, height);
    }
    positions.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={wave} position={[0, 0, -9]}>
      <planeGeometry args={[36, 22, mobile ? 30 : 58, mobile ? 18 : 34]} />
      <meshStandardMaterial
        color="#0b2d67"
        emissive="#063d93"
        emissiveIntensity={0.75}
        metalness={0.52}
        roughness={0.3}
        transparent
        opacity={0.55}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function GlassSphere({ position, scale, mobile, speed }: {
  position: [number, number, number];
  scale: number;
  mobile: boolean;
  speed: number;
}) {
  const sphere = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (!sphere.current) return;
    const time = clock.elapsedTime * speed * 1.4;
    const drift = mobile ? 0.62 : 1;
    sphere.current.position.set(
      position[0] + Math.sin(time * 0.66) * 0.34 * drift,
      position[1] + Math.cos(time * 0.82) * 0.25 * drift,
      position[2] + Math.sin(time * 0.54) * 0.3 * drift,
    );
    sphere.current.rotation.x = Math.sin(time * 0.42) * 0.14;
    sphere.current.rotation.y += delta * speed * 0.36;
    sphere.current.rotation.z = Math.cos(time * 0.48) * 0.1;
  });

  return (
    <group ref={sphere} position={position}>
      <mesh scale={scale} castShadow receiveShadow>
        <sphereGeometry args={[1, mobile ? 28 : 40, mobile ? 20 : 32]} />
        <meshPhysicalMaterial
          color="#5acbff"
          metalness={0.08}
          roughness={0.06}
          transmission={0.94}
          thickness={0.85}
          ior={1.28}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.5}
        />
        <mesh scale={0.91}>
          <sphereGeometry args={[1, mobile ? 20 : 32, mobile ? 16 : 24]} />
          <meshBasicMaterial color="#42baff" wireframe transparent opacity={0.08} />
        </mesh>
      </mesh>
    </group>
  );
}

function MetallicRing({ position, rotation, radius, mobile, speed }: {
  position: [number, number, number];
  rotation: [number, number, number];
  radius: number;
  mobile: boolean;
  speed: number;
}) {
  const ring = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (!ring.current) return;
    const time = clock.elapsedTime * speed * 1.25;
    const drift = mobile ? 0.68 : 1;
    ring.current.position.set(
      position[0] + Math.sin(time * 0.62) * 0.28 * drift,
      position[1] + Math.cos(time * 0.74) * 0.17 * drift,
      position[2] + Math.sin(time * 0.56) * 0.26 * drift,
    );
    ring.current.rotation.x += delta * speed * 0.38;
    ring.current.rotation.y += delta * speed * 1.4;
    ring.current.rotation.z -= delta * speed * 0.62;
  });

  return (
    <group ref={ring} position={position}>
      <mesh rotation={rotation} castShadow receiveShadow>
        <torusGeometry args={[radius, mobile ? 0.018 : 0.026, 8, mobile ? 52 : 88]} />
        <meshPhysicalMaterial
          color="#66dfff"
          metalness={0.84}
          roughness={0.18}
          emissive="#0757aa"
          emissiveIntensity={0.42}
          envMapIntensity={1.6}
        />
      </mesh>
    </group>
  );
}

function CurvedStructure({ position, mobile }: { position: [number, number, number]; mobile: boolean }) {
  const structure = useRef<THREE.Group>(null);
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-3.2, -0.5, 0),
        new THREE.Vector3(-2.2, 1.4, 0.5),
        new THREE.Vector3(-0.2, 1.9, 0),
        new THREE.Vector3(1.9, 1.2, -0.45),
        new THREE.Vector3(3.1, -0.35, 0),
      ]),
    [],
  );

  useFrame(({ clock }, delta) => {
    if (!structure.current) return;
    const time = clock.elapsedTime * 0.28;
    const drift = mobile ? 0.6 : 1;
    structure.current.position.set(
      position[0] + Math.sin(time * 0.58) * 0.3 * drift,
      position[1] + Math.cos(time * 0.72) * 0.2 * drift,
      position[2] + Math.sin(time * 0.46) * 0.32 * drift,
    );
    structure.current.rotation.x = Math.sin(time * 0.4) * 0.075;
    structure.current.rotation.y += delta * 0.035;
    structure.current.rotation.z = Math.cos(time * 0.36) * 0.06;
  });

  return (
    <group ref={structure} position={position}>
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve, mobile ? 36 : 64, mobile ? 0.022 : 0.032, 6, false]} />
        <meshPhysicalMaterial
          color="#779eff"
          metalness={0.72}
          roughness={0.2}
          emissive="#163dba"
          emissiveIntensity={0.5}
          envMapIntensity={1.4}
        />
      </mesh>
    </group>
  );
}

function Scene({ mobile, reducedMotion, pointer }: {
  mobile: boolean;
  reducedMotion: boolean;
  pointer: React.MutableRefObject<THREE.Vector2>;
}) {
  const parallax = useRef<THREE.Group>(null);
  const crystal = useRef<THREE.Group>(null);
  const side = mobile ? 5.2 : 11.4;

  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;
    if (parallax.current) {
      parallax.current.position.x = THREE.MathUtils.damp(
        parallax.current.position.x,
        pointer.current.x * 0.18,
        1.6,
        delta,
      );
      parallax.current.position.y = THREE.MathUtils.damp(
        parallax.current.position.y,
        pointer.current.y * 0.12,
        1.6,
        delta,
      );
      parallax.current.rotation.y = THREE.MathUtils.damp(
        parallax.current.rotation.y,
        pointer.current.x * 0.035,
        1.6,
        delta,
      );
      parallax.current.rotation.x = THREE.MathUtils.damp(
        parallax.current.rotation.x,
        -pointer.current.y * 0.025,
        1.6,
        delta,
      );
      parallax.current.rotation.z = THREE.MathUtils.damp(
        parallax.current.rotation.z,
        pointer.current.x * 0.008,
        1.6,
        delta,
      );
    }

    if (crystal.current) {
      const time = clock.elapsedTime * 0.26;
      const drift = mobile ? 0.6 : 1;
      crystal.current.position.set(
        side * 0.83 + Math.sin(time * 0.62) * 0.26 * drift,
        4.8 + Math.cos(time * 0.78) * 0.2 * drift,
        -2.8 + Math.sin(time * 0.5) * 0.3 * drift,
      );
      crystal.current.rotation.x += delta * 0.07;
      crystal.current.rotation.y -= delta * 0.045;
      crystal.current.rotation.z = Math.sin(time * 0.4) * 0.08;
    }
  });

  return (
    <>
      <FrameGate active={!reducedMotion} fps={mobile ? 20 : 30} />
      <fog attach="fog" args={["#071126", 19, 52]} />
      <ambientLight intensity={0.82} color="#9abfff" />
      <directionalLight position={[-8, 8, 10]} intensity={1.8} color="#d5f3ff" />
      <pointLight position={[side, 2, 3]} intensity={85} distance={20} color="#087dff" />
      <pointLight position={[-side, -2, 0]} intensity={72} distance={18} color="#16d7ff" />
      <pointLight position={[0, 9, -3]} intensity={60} distance={22} color="#6749ff" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={3.5} color="#77ddff" position={[-6, 4, 4]} scale={[9, 2, 1]} />
        <Lightformer form="rect" intensity={2.8} color="#7a64ff" position={[6, 1, -2]} scale={[8, 3, 1]} />
        <Lightformer form="circle" intensity={2.2} color="#dbf8ff" position={[0, 5, 1]} scale={3} />
      </Environment>

      <group ref={parallax}>
        <WaveSurface mobile={mobile} reducedMotion={reducedMotion} />
        <GlassSphere position={[-side, 2.4, -2]} scale={mobile ? 0.86 : 1.45} mobile={mobile} speed={0.22} />
        <GlassSphere position={[side, -2.7, -3]} scale={mobile ? 0.68 : 1.12} mobile={mobile} speed={0.34} />
        {!mobile && <GlassSphere position={[0, 8.3, -4]} scale={0.8} mobile={false} speed={0.18} />}

        <MetallicRing
          position={[-side, 0.1, -1.7]}
          rotation={[1.08, 0.42, -0.24]}
          radius={mobile ? 1.45 : 2.05}
          mobile={mobile}
          speed={0.19}
        />
        <MetallicRing
          position={[side, 1.2, -2.6]}
          rotation={[0.48, -0.72, 0.3]}
          radius={mobile ? 1.2 : 1.7}
          mobile={mobile}
          speed={0.27}
        />
        {!mobile && (
          <MetallicRing
            position={[0, -8.1, -1]}
            rotation={[0.2, 0.82, -0.08]}
            radius={2.45}
            mobile={false}
            speed={0.16}
          />
        )}

        <CurvedStructure position={[-side * 0.56, 6.7, -3.4]} mobile={mobile} />
        {!mobile && <CurvedStructure position={[side * 0.52, -6.8, -4]} mobile={false} />}

        <group ref={crystal} position={[side * 0.83, 4.8, -2.8]}>
          <mesh rotation={[0.2, 0.4, 0.3]} scale={mobile ? 0.6 : 0.85} castShadow receiveShadow>
            <octahedronGeometry args={[0.9, 1]} />
            <meshPhysicalMaterial
              color="#927bff"
              metalness={0.28}
              roughness={0.1}
              transmission={0.72}
              thickness={0.55}
              envMapIntensity={1.6}
              transparent
              opacity={0.78}
            />
          </mesh>
        </group>

        <Sparkles
          count={mobile ? 24 : 72}
          scale={mobile ? [13, 12, 8] : [30, 18, 15]}
          size={mobile ? 1.6 : 2.2}
          speed={0.14}
          opacity={0.48}
          color="#8beaff"
        />
      </group>
      <ContactShadows
        position={[0, -7.5, -1]}
        scale={mobile ? 14 : 26}
        blur={3}
        far={12}
        resolution={mobile ? 128 : 256}
        opacity={0.26}
        color="#1262bb"
        frames={1}
      />
      {!mobile && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.8} luminanceThreshold={0.34} luminanceSmoothing={0.16} mipmapBlur />
          <DepthOfField focusDistance={0.018} focalLength={0.018} bokehScale={1.4} />
        </EffectComposer>
      )}
    </>
  );
}

export default function ImmersiveBackground() {
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const [mobile, setMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    setPortal(document.body);
    const smallOrTouch = window.matchMedia("(max-width: 700px), (pointer: coarse)");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreferences = () => {
      setMobile(smallOrTouch.matches);
      setReducedMotion(motionPreference.matches);
    };
    const trackPointer = (event: PointerEvent) => {
      if (motionPreference.matches || smallOrTouch.matches || event.pointerType === "touch") return;
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      );
    };

    updatePreferences();
    smallOrTouch.addEventListener("change", updatePreferences);
    motionPreference.addEventListener("change", updatePreferences);
    window.addEventListener("pointermove", trackPointer, { passive: true });

    return () => {
      smallOrTouch.removeEventListener("change", updatePreferences);
      motionPreference.removeEventListener("change", updatePreferences);
      window.removeEventListener("pointermove", trackPointer);
    };
  }, []);

  if (!portal) return null;

  return createPortal(
    <motion.div
      className="immersive-background"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 1.1, ease: "easeOut" }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 18], fov: 44 }}
        dpr={mobile ? 1 : [1, 1.35]}
        frameloop="demand"
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        fallback={<div className="immersive-background-fallback" />}
      >
        <Scene mobile={mobile} reducedMotion={reducedMotion} pointer={pointer} />
      </Canvas>
    </motion.div>,
    portal,
  );
}

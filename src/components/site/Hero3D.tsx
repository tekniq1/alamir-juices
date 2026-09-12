import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D juice cup: glass tumbler, sloshing liquid (vertex-displaced
 * surface) and orbiting fruit slices, all following mouse parallax.
 */
function Cup({ liquid }: { liquid: THREE.Color }) {
  const group = useRef<THREE.Group>(null);
  const surface = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const velocity = useRef(new THREE.Vector2());
  const prev = useRef(new THREE.Vector2());

  const surfGeo = useMemo(() => new THREE.CircleGeometry(0.78, 48), []);
  const base = useMemo(() => surfGeo.attributes.position.array.slice(), [surfGeo]);

  useFrame(({ clock }, dt) => {
    if (!group.current || !surface.current) return;
    const t = clock.elapsedTime;
    // parallax
    const tx = pointer.x * 0.35;
    const ty = -pointer.y * 0.25;
    group.current.rotation.y += (tx - group.current.rotation.y) * 4 * dt;
    group.current.rotation.x += (ty - group.current.rotation.x) * 4 * dt;
    group.current.rotation.z = Math.sin(t * 0.8) * 0.04;
    // slosh: velocity from pointer delta
    velocity.current.x += (pointer.x - prev.current.x) * 2;
    velocity.current.y += (pointer.y - prev.current.y) * 2;
    prev.current.set(pointer.x, pointer.y);
    velocity.current.multiplyScalar(Math.exp(-2.2 * dt));
    const pos = surfGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const wave = Math.sin(x * 4 + t * 3) * 0.02 + Math.cos(y * 4 + t * 2.3) * 0.02;
      const tilt = x * velocity.current.x * 0.35 + y * velocity.current.y * 0.35;
      pos.setZ(i, wave + tilt);
    }
    pos.needsUpdate = true;
    surfGeo.computeVertexNormals();
  });

  return (
    <group ref={group}>
      {/* glass */}
      <mesh castShadow>
        <cylinderGeometry args={[0.85, 0.65, 2.4, 48, 1, true]} />
        <meshPhysicalMaterial transmission={0.95} thickness={0.4} roughness={0.05} ior={1.45} color="#ffffff" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.65, 0.62, 0.08, 48]} />
        <meshPhysicalMaterial transmission={0.9} roughness={0.1} color="#ffffff" transparent opacity={0.6} />
      </mesh>
      {/* liquid body */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.79, 0.64, 1.8, 48]} />
        <meshPhysicalMaterial color={liquid} roughness={0.25} transmission={0.25} thickness={1.2} clearcoat={1} />
      </mesh>
      {/* liquid surface */}
      <mesh ref={surface} geometry={surfGeo} position={[0, 0.66, 0]} rotation-x={-Math.PI / 2}>
        <meshPhysicalMaterial color={liquid} roughness={0.15} clearcoat={1} side={THREE.DoubleSide} />
      </mesh>
      {/* straw */}
      <mesh position={[0.35, 0.9, 0]} rotation-z={-0.25}>
        <cylinderGeometry args={[0.06, 0.06, 2.6, 16]} />
        <meshStandardMaterial color="#121212" roughness={0.4} />
      </mesh>
      {/* ice cubes */}
      {[0.3, -0.35, 0].map((x, i) => (
        <mesh key={i} position={[x, 0.45 + i * 0.05, i * 0.2 - 0.2]} rotation={[i, i * 0.7, 0]}>
          <boxGeometry args={[0.32, 0.32, 0.32]} />
          <meshPhysicalMaterial transmission={0.9} roughness={0.15} thickness={0.3} color="#ffffff" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Slice({ radius, speed, offset, color, y }: { radius: number; speed: number; offset: number; color: string; y: number }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.set(Math.cos(t) * radius + pointer.x * 0.4, y + Math.sin(t * 1.3) * 0.25 - pointer.y * 0.3, Math.sin(t) * radius);
    ref.current.rotation.set(t * 0.6, t * 0.4, 0);
  });
  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.06, 24]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.035, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.01, 24]} />
        <meshStandardMaterial color="#fff5d6" roughness={0.6} />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[Math.cos((i / 6) * Math.PI * 2) * 0.12, 0.045, Math.sin((i / 6) * Math.PI * 2) * 0.12]} rotation-y={(i / 6) * Math.PI * 2}>
          <boxGeometry args={[0.16, 0.005, 0.05]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const liquid = useMemo(() => new THREE.Color("#FF8C2A"), []);
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} castShadow />
      <spotLight position={[-4, 5, -2]} intensity={1.2} color="#ffd9a8" />
      <Environment>
        <Lightformer intensity={3} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.5} color="#ffe2b8" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
        <Lightformer intensity={1} color="#b58b57" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
        <Cup liquid={liquid} />
      </Float>
      <Slice radius={1.9} speed={0.5} offset={0} color="#FF781F" y={0.6} />
      <Slice radius={2.2} speed={0.38} offset={2} color="#28A745" y={-0.4} />
      <Slice radius={1.7} speed={0.62} offset={4} color="#E63946" y={1.1} />
      <Slice radius={2.4} speed={0.3} offset={5.5} color="#FFD23F" y={-1} />
      <ContactShadows position={[0, -1.9, 0]} opacity={0.35} scale={8} blur={2.4} far={3} color="#5a3d1a" />
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 0.6, 6.2], fov: 38 }} gl={{ alpha: true, antialias: true }} style={{ background: "transparent" }}>
      <Scene />
    </Canvas>
  );
}

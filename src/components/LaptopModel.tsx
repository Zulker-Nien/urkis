"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { a as three } from "@react-spring/three";
import { Interpolation } from "@react-spring/web";

interface ModelProps {
  open: boolean;
  hinge: number | Interpolation<number>;
}

const vec = new THREE.Vector3();

const LaptopModel = ({ open, hinge }: ModelProps) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    window.location.origin + "/mac-draco.glb"
  );

  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.lerp(vec.set(0, 0, open ? -24 : -32), 0.1);
    state.camera.lookAt(0, 0, 0);

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        open ? Math.cos(t / 2) / 8 + 0.25 : 0,
        0.1
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        open ? Math.sin(t / 4) / 4 : 0,
        0.1
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        open ? Math.sin(t / 4) / 4 : 0,
        0.1
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        open ? (-2 + Math.sin(t)) / 3 : -4.3,
        0.1
      );
    }
  });

  useGLTF.preload(window.location.origin + "/mac-draco.glb");

  return (
    <group
      ref={groupRef}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      dispose={null}
    >
      <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={(nodes.Cube008 as THREE.Mesh).geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={(nodes.Cube008_1 as THREE.Mesh).geometry}
          />
          <mesh
            material={materials["screen.001"]}
            geometry={(nodes.Cube008_2 as THREE.Mesh).geometry}
          />
        </group>
      </three.group>
      <mesh
        material={materials.keys}
        geometry={(nodes.keyboard as THREE.Mesh).geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={(nodes.Cube002 as THREE.Mesh).geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={(nodes.Cube002_1 as THREE.Mesh).geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={(nodes.touchbar as THREE.Mesh).geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
};

export default LaptopModel;

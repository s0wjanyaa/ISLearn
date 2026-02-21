import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/** Paths to Ready Player Me GLB models (served from Vite public folder). */
const MODEL_PATHS = {
  male: '/models/male.glb',
  female: '/models/female.glb',
};

function AvatarModel({ url, faceColor }) {
  const { scene } = useGLTF(url);

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    if (faceColor) {
      cloned.traverse((child) => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          const newMaterials = materials.map((material) => {
            if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
              const mat = material.clone();
              mat.color = new THREE.Color(faceColor);
              return mat;
            }
            return material;
          });
          child.material = Array.isArray(child.material) ? newMaterials : newMaterials[0];
        }
      });
    }
    return cloned;
  }, [scene, faceColor]);

  return (
    <group position={[0, -0.6, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

function AvatarScene({ avatarType, faceColor }) {
  const url = MODEL_PATHS[avatarType] ?? MODEL_PATHS.male;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.0, 2.5]} fov={35} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <Suspense fallback={null}>
        <AvatarModel url={url} faceColor={faceColor} />
      </Suspense>
    </>
  );
}

/**
 * Ready Player Me avatar viewer (upper body centered, no zoom/pan).
 * @param {Object} props
 * @param {'male'|'female'} [props.avatarType='male'] - Which GLB to load from /models/
 * @param {string} [props.faceColor] - Hex color for skin tone (e.g., '#FFDBAC')
 */
export default function AvatarViewer({ avatarType = 'male', faceColor }) {
  const type = avatarType === 'female' ? 'female' : 'male';
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 300, background: '#f0f0f0' }}>
      <Canvas gl={{ antialias: true }}>
        <AvatarScene avatarType={type} faceColor={faceColor} />
      </Canvas>
    </div>
  );
}

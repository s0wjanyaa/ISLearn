import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const AvatarMesh = ({ gender, faceColor, isPlaying }) => {
  const meshRef = useRef();
  const headRef = useRef();
  const leftHandRef = useRef();
  const rightHandRef = useRef();
  const leftForearmRef = useRef();
  const rightForearmRef = useRef();
  const bodyRef = useRef();

  // Enhanced animation for sign language gestures
  useFrame((state) => {
    if (!isPlaying) return;

    const time = state.clock.getElapsedTime();
    
    // More realistic hand movements for sign language
    if (leftHandRef.current) {
      leftHandRef.current.rotation.x = Math.sin(time * 1.5) * 0.4;
      leftHandRef.current.rotation.y = Math.sin(time * 1.2) * 0.3;
      leftHandRef.current.rotation.z = Math.cos(time * 1.3) * 0.2;
    }
    
    if (rightHandRef.current) {
      rightHandRef.current.rotation.x = Math.sin(time * 1.5 + Math.PI) * 0.4;
      rightHandRef.current.rotation.y = Math.sin(time * 1.2 + Math.PI) * 0.3;
      rightHandRef.current.rotation.z = Math.cos(time * 1.3 + Math.PI) * 0.2;
    }

    if (leftForearmRef.current) {
      leftForearmRef.current.rotation.x = Math.sin(time * 1.2) * 0.2;
    }

    if (rightForearmRef.current) {
      rightForearmRef.current.rotation.x = Math.sin(time * 1.2 + Math.PI) * 0.2;
    }
  });

  // Different body shapes for male/female
  const bodyWidth = gender === 'female' ? 0.5 : 0.65;
  const bodyHeight = gender === 'female' ? 1.1 : 1.0;
  const shoulderWidth = gender === 'female' ? 0.5 : 0.7;
  const headSize = gender === 'female' ? 0.28 : 0.32;
  const armThickness = gender === 'female' ? 0.12 : 0.15;

  // Hair color
  const hairColor = gender === 'female' ? '#8B4513' : '#2C1810';

  return (
    <group ref={meshRef}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[headSize, 32, 32]} />
        <meshStandardMaterial color={faceColor} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Hair - Different styles for male/female */}
      {gender === 'female' ? (
        // Female: Longer hair
        <group>
          <mesh position={[0, 1.6, 0.15]}>
            <sphereGeometry args={[headSize * 0.9, 16, 16]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[0, 1.45, 0.2]}>
            <boxGeometry args={[headSize * 1.2, headSize * 0.6, headSize * 0.4]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
        </group>
      ) : (
        // Male: Shorter hair
        <mesh position={[0, 1.65, 0.1]}>
          <boxGeometry args={[headSize * 1.1, headSize * 0.4, headSize * 0.3]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
      )}

      {/* Body - Different shapes */}
      <mesh ref={bodyRef} position={[0, 0.8, 0]}>
        <boxGeometry args={[bodyWidth, bodyHeight, 0.4]} />
        <meshStandardMaterial color={gender === 'female' ? '#FF6B9D' : '#4A90E2'} roughness={0.8} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-shoulderWidth/2, 1.1, 0]}>
        <boxGeometry args={[0.2, 0.15, 0.3]} />
        <meshStandardMaterial color={gender === 'female' ? '#FF6B9D' : '#4A90E2'} />
      </mesh>
      <mesh position={[shoulderWidth/2, 1.1, 0]}>
        <boxGeometry args={[0.2, 0.15, 0.3]} />
        <meshStandardMaterial color={gender === 'female' ? '#FF6B9D' : '#4A90E2'} />
      </mesh>

      {/* Left Upper Arm */}
      <mesh ref={leftForearmRef} position={[-shoulderWidth/2 - 0.1, 0.9, 0]}>
        <boxGeometry args={[armThickness, 0.4, armThickness]} />
        <meshStandardMaterial color={faceColor} />
      </mesh>

      {/* Left Forearm */}
      <mesh ref={leftHandRef} position={[-shoulderWidth/2 - 0.1, 0.6, 0]}>
        <boxGeometry args={[armThickness * 0.9, 0.35, armThickness * 0.9]} />
        <meshStandardMaterial color={faceColor} />
      </mesh>

      {/* Left Hand - More detailed */}
      <group position={[-shoulderWidth/2 - 0.1, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[armThickness * 1.2, 0.15, armThickness * 1.5]} />
          <meshStandardMaterial color={faceColor} />
        </mesh>
        {/* Fingers */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[0, -0.1, (i - 2) * 0.08]}>
            <boxGeometry args={[0.03, 0.12, 0.03]} />
            <meshStandardMaterial color={faceColor} />
          </mesh>
        ))}
      </group>

      {/* Right Upper Arm */}
      <mesh ref={rightForearmRef} position={[shoulderWidth/2 + 0.1, 0.9, 0]}>
        <boxGeometry args={[armThickness, 0.4, armThickness]} />
        <meshStandardMaterial color={faceColor} />
      </mesh>

      {/* Right Forearm */}
      <mesh ref={rightHandRef} position={[shoulderWidth/2 + 0.1, 0.6, 0]}>
        <boxGeometry args={[armThickness * 0.9, 0.35, armThickness * 0.9]} />
        <meshStandardMaterial color={faceColor} />
      </mesh>

      {/* Right Hand - More detailed */}
      <group position={[shoulderWidth/2 + 0.1, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[armThickness * 1.2, 0.15, armThickness * 1.5]} />
          <meshStandardMaterial color={faceColor} />
        </mesh>
        {/* Fingers */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[0, -0.1, (i - 2) * 0.08]}>
            <boxGeometry args={[0.03, 0.12, 0.03]} />
            <meshStandardMaterial color={faceColor} />
          </mesh>
        ))}
      </group>

      {/* Legs */}
      <mesh position={[-0.2, -0.3, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[0.2, -0.3, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
    </group>
  );
};

const Avatar3D = ({ gender = 'male', faceColor = '#FFDBAC', isPlaying = false }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1.2, 4.5]} fov={50} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <pointLight position={[0, 3, 3]} intensity={0.8} />
        <AvatarMesh gender={gender} faceColor={faceColor} isPlaying={isPlaying} />
        <OrbitControls enableZoom={true} enablePan={false} minDistance={3} maxDistance={6} />
      </Canvas>
    </div>
  );
};

export default Avatar3D;

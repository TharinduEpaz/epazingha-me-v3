import { PresentationControls, Stage, useAnimations, useFBX, useGLTF, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Loader } from 'lucide-react'

// Avatar Component
function Avatar(props: any & { onLoad?: () => void }) {
  const group = useRef<any>(null)
  const { nodes, materials } = useGLTF('/models/avatar-transformed.glb') as any
  const { animations: standingAnimation } = useFBX('/animations/Standing Idle.fbx')

  standingAnimation[0].name = 'Standing'
  
  const { actions } = useAnimations([standingAnimation[0]], group)

  useEffect(() => {
    // Play the standing animation by default
    const action = actions['Standing']
    if (action) {
      action.reset().fadeIn(0.5).play()
    }
    // Notify parent that model is loaded
    if (props.onLoad) {
      props.onLoad()
    }
    return () => {
      if (action) action.fadeOut(0.5)
    }
  }, [actions, props])

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  )
}

useGLTF.preload('/models/avatar.glb')

// Loading Component (used inside Canvas)
function LoadingProgress({ 
  onLoaded, 
  onProgress 
}: { 
  onLoaded: () => void
  onProgress: (progress: number) => void
}) {
  const { progress, active } = useProgress()
  
  useEffect(() => {
    onProgress(progress)
    if (!active && progress === 100) {
      // Small delay to ensure everything is rendered
      setTimeout(() => {
        onLoaded()
      }, 300)
    }
  }, [active, progress, onLoaded, onProgress])

  return null
}

// Loading Spinner UI Component
function LoaderSpinner({ progress }: { progress?: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
      <div className="flex flex-col items-center gap-4">
        <Loader className="w-8 h-8 text-primary animate-spin" />
        {progress !== undefined && progress < 100 && (
          <p className="text-sm text-muted-foreground font-mono">
            {Math.round(progress)}%
          </p>
        )}
      </div>
    </div>
  )
}

// Main Component
export default function Profile3D({ className }: { className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <div className={`relative ${className || ''}`}>
      {!isLoaded && <LoaderSpinner progress={progress} />}
      <Canvas 
        camera={{ 
          position: [0.2, 0.4, 19], 
          fov: 70, 
          zoom: 3.2, 
        }}
      >
        <LoadingProgress 
          onLoaded={() => setIsLoaded(true)} 
          onProgress={setProgress}
        />
        <PresentationControls>
          <Stage environment="city" intensity={0.6} adjustCamera={false}>
              <Avatar 
                position={[-0.4, 8, 2.7]} 
                rotation={[1.5, 3.1, 3.1]} 
                scale={1.5}
                onLoad={() => setIsLoaded(true)}
              />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  )
}

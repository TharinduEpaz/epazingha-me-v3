import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useAnimations, useFBX, useGLTF, Stage, PresentationControls } from '@react-three/drei'

// Avatar Component
function Avatar(props: any) {
  const group = useRef<any>(null)
  const { nodes, materials } = useGLTF('/models/avatar.glb') as any
  const { animations: standingAnimation } = useFBX('/animations/Standing Idle.fbx')

  standingAnimation[0].name = 'Standing'
  
  const { actions } = useAnimations([standingAnimation[0]], group)

  useEffect(() => {
    // Play the standing animation by default
    const action = actions['Standing']
    if (action) {
      action.reset().fadeIn(0.5).play()
    }
    return () => {
      if (action) action.fadeOut(0.5)
    }
  }, [actions])

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

// Main Component
export default function Profile3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ 
        position: [0.2, 0.1, 13], 
        fov: 70, 
        zoom: 2.4, 
        }}>
        <PresentationControls>
          <Stage environment="city" intensity={0.6} adjustCamera={false}>
              <Avatar position={[-0.5, 6.5, 3]} rotation={[1.5, 3.1, 3.1]} scale={1.5}/>
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  )
}

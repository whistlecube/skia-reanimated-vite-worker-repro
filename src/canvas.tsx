import { Canvas, Circle } from '@shopify/react-native-skia'


export default function CanvasLayer() {
  return (
    <Canvas 
      style={{ width: 800, height: 600 }}
    >
        <Circle cx={400} cy={300} r={100} color="red"/>
    </Canvas>
  )
}
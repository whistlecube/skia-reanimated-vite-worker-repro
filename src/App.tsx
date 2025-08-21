import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web'

function App() {

  return (
    <WithSkiaWeb
      opts={{ locateFile: (file: string) => `/${file}` }}
      getComponent={() => import('./canvas.tsx')}
    />
  )
}

export default App

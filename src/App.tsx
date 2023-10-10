import { useState } from 'react'
import './App.css'
import CreativeSizeBanner from './components/CreativeSizeBanner/CreativeSizeBanner'

function App() {
  const [count, setCount] = useState(0)

  const [creativeSizes, setCreativeSizes] = useState(["100x300", "450x450"])
  return (
    <>
      <CreativeSizeBanner/>
    </>
  )
}

export default App

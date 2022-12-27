import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<any>()
  useEffect(() => {
    const getData = async () => {
      await fetch('http://localhost:4000/hello')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setData(data)
        })
        .catch((error) => console.log(error))
    }
    getData()
  }, [])

  return (
    <div>
      <button onClick={() => console.log(data)}>PRINT</button>
    </div>
  )
}

export default App

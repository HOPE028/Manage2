import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState<any>()
  useEffect(() => {
    const getData = async () => {
      axios({
        method: 'post',
        url: 'http://localhost:4000/api/add_user',
        data: {
          firstName: 'Pasha',
          lastName: 'Khoshkebari',
        },
      })
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

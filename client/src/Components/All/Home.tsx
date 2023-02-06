import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [allowed, setAllowed] = useState<String>('')

  useEffect(() => {
    axios.get('http://localhost:4000/api/can_access_home')
  })

  return <div>{!allowed && <h3>Loading..</h3>}</div>
}

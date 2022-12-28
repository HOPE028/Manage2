import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState<any>()

  const addUser = async () => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/api/add_user',
      data: {
        firstName: 'Pasha',
        lastName: 'Khoshkebari',
      },
    })
      .then((res) => res.data)
      .then((res) => console.log(res))
  }

  const getUsers = async () => {
    axios
      .get('http://localhost:4000/api/get_users')
      .then((res) => res.data.data)
      .then((res) => console.log(res))
  }

  return (
    <div>
      <button onClick={addUser}>Add User</button>
      <button onClick={getUsers}>Get Users</button>
    </div>
  )
}

export default App

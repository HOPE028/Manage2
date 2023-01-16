import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function SignIn() {
  const [email, setEmail] = useState<String>('')
  const [password, setPassword] = useState<String>('')
  const [currentUser, setCurrentUser] = useState('')
  const [error, setError] = useState<String>('')

  const handleLogin = () => {
    if (email === '' || password === '') {
      return setError('All inputs must be filled')
    }

    axios({
      method: 'post',
      url: 'http://localhost:4000/api/sign_in_user_auth',
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => setCurrentUser(res.data.data.user.uid))
      .catch((error) => console.log(error))
  }

  return (
    <div>
      {error && <h3>{error}</h3>}
      {currentUser && <h3>{currentUser}</h3>}
      <h3>Email</h3>
      <input
        type='text'
        placeholder='Email...'
        onChange={(e) => setEmail(e.target.value)}
      />

      <h3>Password</h3>
      <input
        type='password'
        placeholder='Password...'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  )
}

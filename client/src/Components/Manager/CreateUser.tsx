import React, { useState, useEffect, MouseEventHandler } from 'react'
import axios from 'axios'
import { step } from './SignUp'

const getUserUID = async () => {
  axios
    .get('http://localhost:4000/api/get_current_user')
    .then((res) => res.data.data)
    .then((res) => console.log(res.uid))
    .catch((error) => console.log(error))
}

export default function CreateUserManager(props: step) {
  const [email, setEmail] = useState<String>('')
  const [password, setPassword] = useState<String>('')
  const [confirmPassword, setConfirmPassword] = useState<String>('')
  const [error, setError] = useState<String>('')
  const [loading, setLoading] = useState<Boolean>(false)

  const addUserToAuth = async () => {
    let temp = ''

    await axios
      .post('http://localhost:4000/api/sign_up_user_auth', {
        email: email,
        password: password,
      })
      .then((res) => res.data.data)
      .then((res) => res.user)
      .then((res) => (temp = res.uid))
      .catch((error) => {
        console.log(error)
        temp = 'Error'
      })

    return temp
  }

  const addUserToFirebase = async (uid: String) => {
    await axios
      .post('http://localhost:4000/api/initially_add_user', {
        email: email,
        position: 'Manager',
        uid: uid,
        team: '',
        data: {
          teamSettingsCompleted: false,
          registeredSelfInTeam: false,
        },
      })
      .catch((error) => console.log(error))
  }

  const onSubmit = async () => {
    setLoading(true)
    if (!validSubmission(email, password, confirmPassword, setError)) {
      return setLoading(false)
    }

    try {
      const userUID = await addUserToAuth()

      if (userUID === 'Error') {
        setError(
          'Problem Signing Up: Try a different email or a longer password'
        )
        return setLoading(false)
      }

      await addUserToFirebase(userUID)
        .then(() => props.setStep(props.step + 1))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log(console.log(error))
    }
    setLoading(false)
  }

  return (
    <div>
      {error && error}
      <Form
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onSubmit={onSubmit}
        loading={loading}
      />
      <button onClick={getUserUID}>USER?</button>
    </div>
  )
}

const validSubmission = (
  email: String,
  password: String,
  confirmPassword: String,
  setError: Function
) => {
  setError('')
  //Inputs are filled
  if (email === '' || password === '' || confirmPassword === '') {
    return setError('Please Fill In All Input Fields')
  }
  //Email is valid.
  if (
    !email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return setError('Invalid Email')
  }

  //Passwords match each other.
  if (password !== confirmPassword) {
    return setError('Passwords Do Not Match')
  }

  return true
}

interface formProps {
  email: String
  setEmail: Function
  password: String
  setPassword: Function
  confirmPassword: String
  setConfirmPassword: Function
  onSubmit: MouseEventHandler<HTMLButtonElement>
  loading: Boolean
}

const Form = (props: formProps) => {
  return (
    <div>
      <h3>Email</h3>
      <input
        type='email'
        placeholder='Email'
        onChange={(e) => props.setEmail(e.target.value)}
        disabled={props.loading ? true : false}
      />
      <h3>Password</h3>
      <input
        type='password'
        placeholder='Password'
        onChange={(e) => props.setPassword(e.target.value)}
        disabled={props.loading ? true : false}
      />
      <h3>Confirm Password</h3>
      <input
        type='password'
        placeholder='Confirm Password'
        onChange={(e) => props.setConfirmPassword(e.target.value)}
        disabled={props.loading ? true : false}
      />
      <h3>Submit</h3>
      <button onClick={props.onSubmit} disabled={props.loading ? true : false}>
        Submit!
      </button>
    </div>
  )
}

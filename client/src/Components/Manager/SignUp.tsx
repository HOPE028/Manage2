import React, { useState, useEffect } from 'react'
import CreateUserManager from './CreateUser'

export default function ManagerSignUp() {
  const [step, setStep] = useState(0)

  const order = [<CreateUserManager step={step} setStep={setStep} />]

  return <div>{order[step]}</div>
}

import React, { useState, useEffect } from 'react'
import CreateUserManager from './CreateUser'
import TeamSettingsManager from './TeamSettings'
import InputInformationManager from './InputInformationManager'

export default function ManagerSignUp() {
  const [step, setStep] = useState(0)

  const order = [
    <CreateUserManager step={step} setStep={setStep} />,
    <TeamSettingsManager step={step} setStep={setStep} />,
    <InputInformationManager />,
  ]

  return <div>{order[step]}</div>
}

export interface step {
  step: number
  setStep: Function
}

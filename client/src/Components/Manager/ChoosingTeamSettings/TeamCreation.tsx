import React, { useState, useEffect } from 'react'
import {
  interfaceCustomUserInfoRequired,
  interfaceSpecialUserInfoRequired,
} from '../TeamSettings'

interface interfaceTeamCreation {
  step: Number
  setStep: Function
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired>
  specialUserInfoRequired: Array<interfaceSpecialUserInfoRequired>
}

export default function TeamCreation(props: interfaceTeamCreation) {
  const handleTeamCreation = () => {}

  const [loading, setLoading] = useState<boolean>(true)

  return (
    <div>
      {loading && (
        <div>
          <h1>Creating Team...</h1>
          <h3>Hold tight!</h3>
        </div>
      )}
    </div>
  )
}

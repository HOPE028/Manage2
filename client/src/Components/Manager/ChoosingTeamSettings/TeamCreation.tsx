import React, { useState, useEffect } from 'react'
import {
  interfaceCustomUserInfoRequired,
  interfaceSpecialUserInfoRequired,
} from '../TeamSettings'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

interface interfaceTeamCreation {
  step: number
  setStep: Function
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired>
  specialUserInfoRequired: Array<interfaceSpecialUserInfoRequired>
  teamName: String
  membersCanEdit: Boolean
  memberAccessToInfoOnGeneralPage: Array<String>
  generalAccessToInfoOnGeneralPage: Array<String>
  memberAccessToInfoOnIndividualPage: Array<String>
  generalAccessToInfoOnIndividualPage: Array<String>
  generalViewIndividualPage: Boolean
  memberViewIndividualPage: Boolean
}

export default function TeamCreation(props: interfaceTeamCreation) {
  const [teamCode, setTeamCode] = useState<String>('')
  let called: boolean = false

  const handleTeamCreation = async (userUID: String) => {
    const tempTeamCode = uuidv4().substring(0, 8)
    setTeamCode(tempTeamCode)

    if (called === false) {
      axios({
        method: 'post',
        url: 'http://localhost:4000/api/create_team',
        data: {
          teamCode: tempTeamCode,
          customUserInfoRequired: props.customUserInfoRequired,
          specialUserInfoRequired: props.specialUserInfoRequired,
          teamName: props.teamName,
          membersCanEdit: props.membersCanEdit,
          memberAccessToInfoOnGeneralPage:
            props.memberAccessToInfoOnGeneralPage,
          generalAccessToInfoOnGeneralPage:
            props.generalAccessToInfoOnGeneralPage,
          memberAccessToInfoOnIndividualPage:
            props.memberAccessToInfoOnIndividualPage,
          generalAccessToInfoOnIndividualPage:
            props.generalAccessToInfoOnIndividualPage,
          generalViewIndividualPage: props.generalViewIndividualPage,
          memberViewIndividualPage: props.memberViewIndividualPage,
          managerUserUID: userUID,
        },
      })
        .then((res) => res.data)
        .then((res) => {
          console.log(res)
          setLoading(false)
          called = true
        })
        .catch((eror) => {
          console.log(eror)
        })
    }
  }

  const getUserUID = async () => {
    axios
      .get('http://localhost:4000/api/get_current_user')
      .then((res) => res.data.data)
      .then((res) => {
        handleTeamCreation(res.uid)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUserUID()
  }, [])

  const [loading, setLoading] = useState<boolean>(true)

  return (
    <div>
      {loading ? (
        <div>
          <h1>Creating Team...</h1>
          <h3>Hold tight!</h3>
        </div>
      ) : (
        <div>
          <h1>Success!</h1>
          <h3>Team Code: {teamCode}</h3>
          <h3>Carry On To Next Step: Sign Up In Your Own Team!</h3>
          <button onClick={() => props.setStep(props.step + 1)}>
            Join Your Team!
          </button>
        </div>
      )}
    </div>
  )
}

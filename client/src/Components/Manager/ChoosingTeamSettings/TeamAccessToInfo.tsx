import React from 'react'
import { interfaceCustomUserInfoRequired } from '../TeamSettings'
import './style.css'

interface interfaceTeamAccessToInfo {
  step: number
  setStep: Function
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired>
  memberAccessToInfoOnGeneralPage: Array<String> | undefined
  setMemberAccessToInfoOnGeneralPage: Function
  generalAccessToInfoOnGeneralPage: Array<String> | undefined
  setGeneralAccessToInfoOnGeneralPage: Function
}
export default function TeamAccessToInfo(props: interfaceTeamAccessToInfo) {
  return (
    <div>
      <UserHaveAccessToField
        userInfoRequired={props.customUserInfoRequired}
        accessToPage={props.memberAccessToInfoOnGeneralPage}
        setAccessToPage={props.setMemberAccessToInfoOnGeneralPage}
      />
    </div>
  )
}

interface interfaceUserHaveAccessToField {
  userInfoRequired: Array<interfaceCustomUserInfoRequired>
  accessToPage: Array<String> | undefined
  setAccessToPage: Function
}

const UserHaveAccessToField = (props: interfaceUserHaveAccessToField) => {
  return <div>Hello</div>
}

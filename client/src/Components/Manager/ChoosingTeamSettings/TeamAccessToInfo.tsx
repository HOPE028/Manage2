import React from 'react'
import { interfaceCustomUserInfoRequired } from '../TeamSettings'
import './style.css'
import { v4 as uuidv4 } from 'uuid'

interface interfaceTeamAccessToInfo {
  step: number
  setStep: Function
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired>
  memberAccessToInfoOnGeneralPage: Array<String>
  setMemberAccessToInfoOnGeneralPage: Function
  generalAccessToInfoOnGeneralPage: Array<String>
  setGeneralAccessToInfoOnGeneralPage: Function
}
export default function TeamAccessToInfo(props: interfaceTeamAccessToInfo) {
  return (
    <div>
      <h3>Access Members have to info on general page</h3>
      <UserHaveAccessToField
        userInfoRequired={props.customUserInfoRequired}
        accessToPage={props.memberAccessToInfoOnGeneralPage}
        setAccessToPage={props.setMemberAccessToInfoOnGeneralPage}
      />
      <h3>Access Members have to info on general page</h3>
      <UserHaveAccessToField
        userInfoRequired={props.customUserInfoRequired}
        accessToPage={props.generalAccessToInfoOnGeneralPage}
        setAccessToPage={props.setGeneralAccessToInfoOnGeneralPage}
      />

      {props.memberAccessToInfoOnGeneralPage &&
        props.memberAccessToInfoOnGeneralPage.map((field, index) => {
          return (
            <div key={index}>
              <h3>{field}</h3>
            </div>
          )
        })}
    </div>
  )
}

interface interfaceUserHaveAccessToField {
  userInfoRequired: Array<interfaceCustomUserInfoRequired>
  accessToPage: Array<String>
  setAccessToPage: Function
}

const UserHaveAccessToField = (props: interfaceUserHaveAccessToField) => {
  const handleChange = (name: String) => {
    let temp: Array<String> = props.accessToPage

    if (props.accessToPage && props.accessToPage.includes(name)) {
      temp = temp.filter((field: String) => {
        return field !== name
      })
    } else {
      temp.push(name)
    }

    props.setAccessToPage([...temp])
  }

  return (
    <div>
      {props.userInfoRequired.map((field) => {
        const key = uuidv4()

        return (
          <div key={key}>
            <p>{field.name}</p>
            <input
              type='checkbox'
              id={key}
              className='toggle'
              onChange={(e) => handleChange(field.name)}
            />
            <label htmlFor={key}></label>
          </div>
        )
      })}
    </div>
  )
}

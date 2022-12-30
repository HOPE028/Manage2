import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import {
  interfaceCustomUserInfoRequired,
  interfaceSpecialUserInfoRequired,
} from '../TeamSettings'
import './style.css'
import { v4 as uuidv4 } from 'uuid'

interface interfaceTeamAccessToInfo {
  step: number
  setStep: Function
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired>
  specialUserInfoRequired: Array<interfaceSpecialUserInfoRequired>

  // Information View Arrays
  memberAccessToInfoOnGeneralPage: Array<String>
  setMemberAccessToInfoOnGeneralPage: Function
  generalAccessToInfoOnGeneralPage: Array<String>
  setGeneralAccessToInfoOnGeneralPage: Function
  memberAccessToInfoOnIndividualPage: Array<String>
  setMemberAccessToInfoOnIndividualPage: Function
  generalAccessToInfoOnIndividualPage: Array<String>
  setGeneralAccessToInfoOnIndividualPage: Function

  // View Page
  memberViewIndividualPage: boolean
  setMemberViewIndividualPage: Function

  generalViewIndividualPage: boolean
  setGeneralViewIndividualPage: Function
}
export default function TeamAccessToInfo(props: interfaceTeamAccessToInfo) {
  const handleSubmit = () => {
    if (
      window.confirm(
        'Are you sure you would like to create team? Some settings are permenant!'
      )
    )
      props.setStep(props.step + 1)
  }

  return (
    <div>
      <h3>Access Members have to info on general page</h3>
      <UserHaveAccessToField
        customUserInfoRequired={props.customUserInfoRequired}
        specialUserInfoRequired={props.specialUserInfoRequired}
        accessToPage={props.memberAccessToInfoOnGeneralPage}
        setAccessToPage={props.setMemberAccessToInfoOnGeneralPage}
      />
      <h3>Access General have to info on general page</h3>
      <UserHaveAccessToField
        customUserInfoRequired={props.customUserInfoRequired}
        specialUserInfoRequired={props.specialUserInfoRequired}
        accessToPage={props.generalAccessToInfoOnGeneralPage}
        setAccessToPage={props.setGeneralAccessToInfoOnGeneralPage}
      />
      <h3>Do Members have access to Invidual Pages?</h3>
      <UsersHaveAccessToPage
        viewPage={props.memberViewIndividualPage}
        setViewPage={props.setMemberViewIndividualPage}
      />
      {props.memberViewIndividualPage && (
        <div>
          <h3>Access Members have to info on Individual pages</h3>
          <UserHaveAccessToField
            customUserInfoRequired={props.customUserInfoRequired}
            specialUserInfoRequired={props.specialUserInfoRequired}
            accessToPage={props.memberAccessToInfoOnIndividualPage}
            setAccessToPage={props.setMemberAccessToInfoOnIndividualPage}
          />
        </div>
      )}
      <h3>Do General Users have access to Invidual Pages?</h3>
      <UsersHaveAccessToPage
        viewPage={props.generalViewIndividualPage}
        setViewPage={props.setGeneralViewIndividualPage}
      />

      {props.generalViewIndividualPage && (
        <div>
          <h3>Access General have to info on Individual pages</h3>
          <UserHaveAccessToField
            customUserInfoRequired={props.customUserInfoRequired}
            specialUserInfoRequired={props.specialUserInfoRequired}
            accessToPage={props.generalAccessToInfoOnIndividualPage}
            setAccessToPage={props.setGeneralAccessToInfoOnIndividualPage}
          />
        </div>
      )}

      <button
        onClick={() =>
          console.log(
            props.memberAccessToInfoOnGeneralPage,
            props.generalAccessToInfoOnGeneralPage,
            props.memberAccessToInfoOnIndividualPage,
            props.generalAccessToInfoOnIndividualPage
          )
        }
      >
        Data
      </button>
      <button onClick={() => console.log(props.specialUserInfoRequired)}>
        Further Data
      </button>
      <button onClick={handleSubmit}>Create Team!</button>
    </div>
  )
}

interface interfaceUserHaveAccessToField {
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired>
  specialUserInfoRequired: Array<interfaceSpecialUserInfoRequired>
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
      {props.customUserInfoRequired.map((field, index) => {
        const key = uuidv4()
        return (
          <div key={index}>
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
      {props.specialUserInfoRequired.map((field, index) => {
        const key = uuidv4()
        return (
          <div key={index}>
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

interface interfaceUsersHaveAccessToPage {
  viewPage: boolean
  setViewPage: Function
}

const UsersHaveAccessToPage = (props: interfaceUsersHaveAccessToPage) => {
  const key = uuidv4()

  return (
    <div>
      <input
        type='checkbox'
        id={key}
        className='toggle'
        onChange={(e) => props.setViewPage(e.target.checked)}
      />
      <label htmlFor={key}></label>
    </div>
  )
}

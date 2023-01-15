import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  interfaceCustomUserInfoRequired,
  interfaceSpecialUserInfoRequired,
} from './TeamSettings'

export default function InputInformationManager() {
  const [customUserInfoRequired, setCustomUserInfoRequired] = useState<
    Array<interfaceCustomUserInfoRequired>
  >([])
  const [specialUserInfoRequired, setSpecialUserInfoRequired] = useState<
    Array<interfaceSpecialUserInfoRequired>
  >([])

  // interface userInfo {
  //   oo
  // }
  const [userInfo, setUserInfo] = useState({})

  const getUserUID = async () => {
    axios
      .get('http://localhost:4000/api/get_current_user')
      .then((res) => res.data.data)
      .then((res) => getTeamRequiredInfo(res.uid))
      .catch((error) => console.log(error))
  }

  const getTeamRequiredInfo = async (UID: String) => {
    axios
      .get('http://localhost:4000/api/get_user_requirements_through_uid', {
        params: { userUID: UID },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setCustomUserInfoRequired(res.Custom_User_Info_Required)
        setSpecialUserInfoRequired(res.Special_User_Info_Required)
        prepareUserInfo(
          res.Custom_User_Info_Required,
          res.Special_User_Info_Required
        )
      })
      .catch((error) => console.log(error))
  }

  const prepareUserInfo = (
    customInfoRequired: Array<interfaceCustomUserInfoRequired>,
    specialInfoRequired: Array<interfaceSpecialUserInfoRequired>
  ) => {
    let tempUserInput = {}
    for (let field of customInfoRequired) {
      console.log(field.name)
    }
  }

  const handleUserInfoChange = () => {}

  useEffect(() => {
    getUserUID()
  }, [])

  return (
    <div>
      <h1>Input the information</h1>
      <h3>All information is required!</h3>

      {customUserInfoRequired &&
        customUserInfoRequired.map((field, index) => {
          if (['String', 'LongString', 'Number'].includes(field.valueType)) {
            return (
              <div key={index}>
                <h3>{field.name}</h3>
                <h4>{field.description}</h4>
                {field.valueType === 'Number' ? (
                  <input type='number' />
                ) : (
                  <input type='text' />
                )}
              </div>
            )
          }
        })}

      {/* {specialUserInfoRequired &&
        specialUserInfoRequired.map((field, index) => {
          return <div key={index}>{field.name}</div>
        })} */}

      <button
        onClick={() =>
          console.log(customUserInfoRequired, specialUserInfoRequired)
        }
      >
        Data
      </button>
    </div>
  )
}

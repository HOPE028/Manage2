import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  interfaceCustomUserInfoRequired,
  interfaceSpecialUserInfoRequired,
} from './TeamSettings'
import './ChoosingTeamSettings/style.css'
import { v4 as uuidv4 } from 'uuid'

// interface interfaceFile {
//   value: string
//   // file: FileList | null
// }

interface dynamicObject {
  [key: string]: String | Number | Boolean // | interfaceFile
}

export default function InputInformationManager() {
  const [customUserInfoRequired, setCustomUserInfoRequired] = useState<
    Array<interfaceCustomUserInfoRequired>
  >([])
  const [specialUserInfoRequired, setSpecialUserInfoRequired] = useState<
    Array<interfaceSpecialUserInfoRequired>
  >([])

  const [userInfo, setUserInfo] = useState<dynamicObject>({})

  useEffect(() => {
    getUserUID()
  }, [])

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
    let tempUserInput: dynamicObject = {}
    for (let field of customInfoRequired) {
      if (['String', 'LongString'].includes(field.valueType)) {
        tempUserInput[field.name] = ''
      } else if (field.valueType === 'Number') {
        tempUserInput[field.name] = 0
      } else if (field.valueType === 'Boolean') {
        tempUserInput[field.name] = false
      } // else if (field.valueType === 'File') {
      //   tempUserInput[field.name] = {
      //     value: '',
      //     file: null,
      //   }
      // }
    }
    for (let field of specialInfoRequired) {
      if (['String', 'LongString', 'File'].includes(field.valueType)) {
        tempUserInput[field.name] = ''
      } else if (field.valueType === 'Number') {
        tempUserInput[field.name] = 0
      } else if (field.valueType === 'Boolean') {
        tempUserInput[field.name] = false
      }
    }
    setUserInfo(tempUserInput)
  }

  return (
    <div>
      <h1>Input the information</h1>
      <h3>All information is required!</h3>
      <InputInformation
        userInfoRequired={customUserInfoRequired}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />

      <InputInformation
        userInfoRequired={specialUserInfoRequired}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <button onClick={() => console.log(userInfo)}>Data</button>
    </div>
  )
}

interface interfaceInputInformation {
  userInfoRequired:
    | Array<interfaceCustomUserInfoRequired>
    | Array<interfaceSpecialUserInfoRequired>
  userInfo: dynamicObject
  setUserInfo: Function
}

const InputInformation = (props: interfaceInputInformation) => {
  const handleUserInfoChange = (
    key: string,
    target: String | Number | Boolean // | FileList,
  ) => {
    let temp = props.userInfo
    temp[key] = target
    props.setUserInfo(temp)
  }

  // const [file, setFile] = useState<string>()

  // const convertFile = (files: FileList | null) => {
  //   if (files) {
  //     const fileRef = files[0] || ''
  //     const fileType: string = fileRef.type || ''
  //     console.log('This file upload is of type:', fileType)
  //     const reader = new FileReader()
  //     reader.readAsBinaryString(fileRef)
  //     reader.onload = (ev: any) => {
  //       // convert it to base64
  //       setFile(`data:${fileType};base64,${btoa(ev.target.result)}`)
  //     }
  //   }
  // }

  return (
    <div>
      {props.userInfoRequired &&
        props.userInfoRequired.map((field, index) => {
          const key = uuidv4()
          return (
            <div key={index}>
              <h3>{field.name}</h3>
              <h4>{field.description}</h4>

              {field.valueType === 'String' && (
                <div>
                  <input
                    type='text'
                    onChange={(e) =>
                      handleUserInfoChange(
                        field.name,
                        e.target.value
                        // field.valueType
                      )
                    }
                    maxLength={30}
                  />
                </div>
              )}
              {field.valueType === 'Number' && (
                <div>
                  <input
                    type='number'
                    onChange={(e) =>
                      handleUserInfoChange(
                        field.name,
                        Number(e.target.value)
                        // field.valueType
                      )
                    }
                    maxLength={30}
                  />
                </div>
              )}
              {field.valueType === 'LongString' && (
                <div>
                  <textarea
                    onChange={(e) =>
                      handleUserInfoChange(
                        field.name,
                        e.target.value
                        // field.valueType
                      )
                    }
                  />
                </div>
              )}
              {field.valueType === 'Boolean' && (
                <div>
                  <input
                    type='checkbox'
                    id={key}
                    className='toggle'
                    onChange={(e) => {
                      handleUserInfoChange(
                        field.name,
                        Boolean(e.target.checked)
                        // field.valueType
                      )
                      console.log(Boolean(e.target.checked))
                    }}
                  />
                  <label htmlFor={key}></label>
                </div>
              )}
            </div>
          )
        })}
    </div>
  )
}

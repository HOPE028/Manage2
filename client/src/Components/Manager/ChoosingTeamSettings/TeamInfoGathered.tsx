import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  interfaceCustomUserInfoRequired,
  interfaceSpecialUserInfoRequired,
} from '../TeamSettings'
import { v4 as uuidv4 } from 'uuid'

interface interfaceTeamInfoGathered {
  step: number
  setStep: Function
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired> | undefined
  setCustomUserInfoRequired: Function
  specialUserInfoRequired: Array<interfaceSpecialUserInfoRequired>
  setSpecialUserInfoRequired: Function
}

export default function TeamInfoGathered(props: interfaceTeamInfoGathered) {
  const [error, setError] = useState<String>('')
  const [specialUserInfo, setSpecialUserInfo] =
    useState<Array<interfaceSpecialUserInfoRequired>>()
  const [listOfNamesNotUsable, setListOfNamesNotUsable] =
    useState<Array<String>>()

  useEffect(() => {
    getSpecialUserInfoData(setSpecialUserInfo, setListOfNamesNotUsable)
  }, [])

  const handleNextPage = () => {
    if (
      error === 'All name of fields must be filled' ||
      error === 'All name of fields must be unique' ||
      error === 'Custom Field Names Can Not Be Those Of Special Fields'
    )
      setError('')

    if (!noEmptyField(props.customUserInfoRequired))
      return setError('All name of fields must be filled')
    if (!onlyUniqueNames(props.customUserInfoRequired))
      return setError('All name of fields must be unique')
    if (!nonAllowedNames(props.customUserInfoRequired, listOfNamesNotUsable))
      return setError('Custom Field Names Can Not Be Those Of Special Fields')

    props.setStep(props.step + 1)
  }

  return (
    <div>
      {error && error}
      <h1>Custom Information: Make your own information fields!</h1>

      <h3>
        Names of custom fields cannot be field's name:{' '}
        {listOfNamesNotUsable !== undefined
          ? listOfNamesNotUsable.map((name, index) => {
              return (
                <span key={index}>
                  {name} {', '}
                </span>
              )
            })
          : 'Loading..'}
      </h3>

      <ViewCustomInfoRequired
        customUserInfoRequired={props.customUserInfoRequired}
        setCustomUserInfoRequired={props.setCustomUserInfoRequired}
        error={error}
        setError={setError}
      />
      <AddFieldToCustomInformation
        customUserInfoRequired={props.customUserInfoRequired}
        setCustomUserInfoRequired={props.setCustomUserInfoRequired}
        error={error}
        setError={setError}
      />

      <h1>Special Information: Special Information Fields!</h1>
      <h3>
        Choose all you would like to recieve (Name and Hours are automatically
        chosen)
      </h3>

      {!specialUserInfo ? (
        <h3>Loading..</h3>
      ) : (
        <ViewSpecialInfoPossible
          specialUserInfoPossible={specialUserInfo}
          specialUserInfoRequired={props.specialUserInfoRequired}
          setSpecialUserInfoRequired={props.setSpecialUserInfoRequired}
        />
      )}

      <button onClick={() => console.log(props.specialUserInfoRequired)}>
        DATA
      </button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  )
}

const getSpecialUserInfoData = async (
  setSpecialUserInfo: Function,
  setListOfNamesNotUsable: Function
) => {
  console.log('GOT CALLED')
  let resault: Array<interfaceCustomUserInfoRequired> = []

  await axios
    .get('http://localhost:4000/api/data/specialFields')
    .then((res) => res.data.data)
    .then((res) => (resault = res))

  await setSpecialUserInfo(resault)
  await setListOfNamesNotUsable(makeListOfNamesNotUsable(resault))
}

const makeListOfNamesNotUsable = (
  data: Array<interfaceCustomUserInfoRequired>
): Array<String> => {
  let listOfNonUsableNames: Array<String> = ['Name', 'Hours']

  for (let field of data) {
    listOfNonUsableNames.push(field.name)
  }

  return listOfNonUsableNames
}

interface interfaceCustomUserInfoRequiredFunctions {
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired> | undefined
  setCustomUserInfoRequired: Function
  error: String
  setError: Function
}

const ViewCustomInfoRequired = (
  props: interfaceCustomUserInfoRequiredFunctions
) => {
  const handleInformationChange = (
    key: keyof interfaceCustomUserInfoRequired,
    index: number,
    value: string
  ) => {
    if (props.customUserInfoRequired) {
      let temp = props.customUserInfoRequired
      temp[index][key] = value
      props.setCustomUserInfoRequired([...temp])
    }
  }
  const handleDelete = (indexToDelete: number) => {
    if (props.customUserInfoRequired) {
      let temp = props.customUserInfoRequired
      temp = temp.filter((item, index) => {
        return index !== indexToDelete
      })
      props.setCustomUserInfoRequired([...temp])
    }
  }
  return (
    <div>
      {props.customUserInfoRequired &&
        props.customUserInfoRequired.map((field, index) => {
          return (
            <div key={index}>
              <input
                type='text'
                value={field.name}
                onChange={(e) =>
                  handleInformationChange('name', index, e.target.value)
                }
                placeholder='Enter Name'
              />

              <input
                type='text'
                value={field.description}
                onChange={(e) =>
                  handleInformationChange('description', index, e.target.value)
                }
                placeholder='Enter Description'
              />

              <select
                value={field.valueType}
                name='valueType'
                onChange={(e) =>
                  handleInformationChange('valueType', index, e.target.value)
                }
              >
                <option value='String'>Short Text</option>
                <option value='LongString'>Long Text</option>
                <option value='Number'>Number</option>
                <option value='Boolean'>Yes-Or-No</option>
              </select>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          )
        })}
    </div>
  )
}

const AddFieldToCustomInformation = (
  props: interfaceCustomUserInfoRequiredFunctions
) => {
  const handleAddField = () => {
    if (props.error === 'Please fill in all fields before creating new ones')
      props.setError('')

    if (!props.customUserInfoRequired) return

    if (!noEmptyField(props.customUserInfoRequired))
      return props.setError(
        'Please fill in all fields before creating new ones'
      )

    let tempInfoRequired = props.customUserInfoRequired
    let tempObject: interfaceCustomUserInfoRequired = {
      name: '',
      description: '',
      valueType: 'String',
    }

    tempInfoRequired.push(tempObject)
    props.setCustomUserInfoRequired([...tempInfoRequired])
  }

  return (
    <div>
      <button onClick={handleAddField}>Add New Field</button>
    </div>
  )
}

interface interfaceViewSpecialInfoPossible {
  specialUserInfoPossible: Array<interfaceCustomUserInfoRequired>
  specialUserInfoRequired: Array<interfaceCustomUserInfoRequired>
  setSpecialUserInfoRequired: Function
}

const ViewSpecialInfoPossible = (props: interfaceViewSpecialInfoPossible) => {
  const handleChange = (specefiedField: interfaceSpecialUserInfoRequired) => {
    let temp = props.specialUserInfoRequired
    if (!props.specialUserInfoRequired.includes(specefiedField)) {
      temp.push(specefiedField)
    } else {
      temp = temp.filter((field) => field !== specefiedField)
      console.log('BOOZA')
    }
    props.setSpecialUserInfoRequired([...temp])
  }

  return (
    <div>
      {props.specialUserInfoPossible.map((field, index) => {
        const key = uuidv4()

        return (
          <div key={index}>
            <h3>{field.name}</h3>
            <p>{field.description}</p>
            <input
              type='checkbox'
              id={key}
              className='toggle'
              onChange={() => handleChange(field)}
            />
            <label htmlFor={key}></label>
          </div>
        )
      })}
    </div>
  )
}

const noEmptyField = (
  fields: Array<interfaceCustomUserInfoRequired> | undefined
): boolean => {
  if (!fields) return false

  for (const field of fields) {
    if (field.name == '') return false
  }
  return true
}

const onlyUniqueNames = (
  fields: Array<interfaceCustomUserInfoRequired> | undefined
): boolean => {
  if (!fields) return false

  let map: any = {}

  for (const field of fields) {
    if (map[field.name] == undefined) {
      map[field.name] = 1
    } else {
      return false
    }
  }
  return true
}

const nonAllowedNames = (
  fields: Array<interfaceCustomUserInfoRequired> | undefined,
  notALlowedNames: Array<String> | undefined
): Boolean => {
  if (!fields) return true

  if (!notALlowedNames) return true

  for (const field of fields) {
    if (notALlowedNames.includes(field.name)) return false
  }

  return true
}

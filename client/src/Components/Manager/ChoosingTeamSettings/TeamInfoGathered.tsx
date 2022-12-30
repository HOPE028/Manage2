import React, { useState } from 'react'
import { interfaceCustomUserInfoRequired } from '../TeamSettings'

interface interfaceTeamInfoGathered {
  step: number
  setStep: Function
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired> | undefined
  setCustomUserInfoRequired: Function
}

export default function TeamInfoGathered(props: interfaceTeamInfoGathered) {
  const [error, setError] = useState<String>('')

  const handleNextPage = () => {
    if (error === 'All name of fields must be filled') setError('')

    if (!noEmptyField(props.customUserInfoRequired))
      return setError('All name of fields must be filled')

    if (!onlyUniqueNames(props.customUserInfoRequired))
      return setError('All name of fields must be unique')

    props.setStep(props.step + 1)
  }

  return (
    <div>
      {error && error}
      <h3>
        Names of custom fields cannot be field's name: 'Photograph', 'Name',
        'Nickname', 'Biography'
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

      <button onClick={() => console.log(props.customUserInfoRequired)}>
        DATA
      </button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  )
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

// const no

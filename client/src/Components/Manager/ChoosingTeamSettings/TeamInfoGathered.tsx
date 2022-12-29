import React, { useState, useMemo, useCallback } from 'react'
import { interfaceCustomUserInfoRequired } from '../TeamSettings'

interface interfaceTeamInfoGathered {
  step: number
  setStep: Function
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired> | undefined
  setCustomUserInfoRequired: Function
}

export default function TeamInfoGathered(props: interfaceTeamInfoGathered) {
  const [error, setError] = useState<String>('')

  return (
    <div>
      {error && error}
      <ViewCustomInfoRequired
        customUserInfoRequired={props.customUserInfoRequired}
        setCustomUserInfoRequired={props.setCustomUserInfoRequired}
        setError={setError}
      />
      <AddFieldToCustomInformation
        customUserInfoRequired={props.customUserInfoRequired}
        setCustomUserInfoRequired={props.setCustomUserInfoRequired}
        setError={setError}
      />

      <button onClick={() => console.log(props.customUserInfoRequired)}>
        DATA
      </button>
    </div>
  )
}

interface interfaceCustomUserInfoRequiredFunctions {
  customUserInfoRequired: Array<interfaceCustomUserInfoRequired> | undefined
  setCustomUserInfoRequired: Function
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
              />

              <select
                value={field.valueType}
                name='valueType'
                onChange={(e) =>
                  handleInformationChange('valueType', index, e.target.value)
                }
              >
                <option value='String'>Text</option>
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
  const noEmptyField = useCallback((): boolean => {
    let emptySpots = false

    if (!props.customUserInfoRequired) return false

    for (const field of props.customUserInfoRequired) {
      if (field.name == '') emptySpots = true
    }
    return emptySpots
  }, [emptySpots])

  const handleAddField = () => {
    if (!props.customUserInfoRequired) return

    const carryOn = useMemo(
      () => noEmptyField(),
      [props.customUserInfoRequired]
    )

    if (!carryOn)
      return props.setError(
        'Please fill in all fields before creating new ones'
      )

    let tempInfoRequired = props.customUserInfoRequired
    let tempObject: interfaceCustomUserInfoRequired = {
      name: '',
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

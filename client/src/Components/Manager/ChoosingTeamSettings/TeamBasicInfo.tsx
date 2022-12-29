import React, { useState } from 'react'
import './style.css'

interface interfaceTeamBasicInfo {
  step: number
  setStep: Function
  teamName: String
  setTeamName: Function
  membersCanEdit: Boolean
  SetMembersCanEdit: Function
}

export default function TeamBasicInfo(props: interfaceTeamBasicInfo) {
  const [error, setError] = useState<String>('')

  const onSubmit = () => {
    setError('')
    if (props.teamName == '') return setError('Team name can not be blank')
    props.setStep(props.step + 1)
  }

  return (
    <div>
      <h3>{error && error}</h3>
      <h3>Team name</h3>
      <input
        type='text'
        placeholder='Team Name'
        onChange={(e) => props.setTeamName(e.target.value)}
      />
      <h3>Can Members Edit Information Once They Submit?</h3>
      <input
        type='checkbox'
        id='EditInformationAfterSubmission'
        className='toggle'
        onChange={(e) => props.SetMembersCanEdit(e.target.checked)}
      />
      <label htmlFor='EditInformationAfterSubmission'></label>
      <button onClick={onSubmit}>Next</button>
      <button onClick={() => console.log(props.membersCanEdit)}>Data</button>
    </div>
  )
}

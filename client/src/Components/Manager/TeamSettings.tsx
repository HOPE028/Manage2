import React, { useState, useEffect } from 'react'
import { step } from './SignUp'
import TeamBasicInfo from './ChoosingTeamSettings/TeamBasicInfo'

export default function TeamSettingsManager(props: step) {
  const [teamName, setTeamName] = useState<String>('')
  const [membersCanEdit, SetMembersCanEdit] = useState<Boolean>(false)
  const [teamSettingsStep, setTeamSettingsStep] = useState<number>(0)

  const order = [
    <TeamBasicInfo
      step={teamSettingsStep}
      setStep={setTeamSettingsStep}
      teamName={teamName}
      setTeamName={setTeamName}
      membersCanEdit={membersCanEdit}
      SetMembersCanEdit={SetMembersCanEdit}
    />,
  ]

  return <div>{order[teamSettingsStep]}</div>
}

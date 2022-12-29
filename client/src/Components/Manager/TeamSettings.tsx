import React, { useState, useEffect } from 'react'
import { step } from './SignUp'
import TeamBasicInfo from './ChoosingTeamSettings/TeamBasicInfo'
import TeamInfoGathered from './ChoosingTeamSettings/TeamInfoGathered'

export interface interfaceCustomUserInfoRequired {
  name: string
  valueType: string
}

export default function TeamSettingsManager(props: step) {
  const [teamName, setTeamName] = useState<String>('')
  const [membersCanEdit, SetMembersCanEdit] = useState<Boolean>(false)
  const [teamSettingsStep, setTeamSettingsStep] = useState<number>(0)
  const [customUserInfoRequired, setCustomUserInfoRequired] = useState<
    Array<interfaceCustomUserInfoRequired>
  >([
    { name: 'Woah', valueType: 'String' },
    { name: 'Woah', valueType: 'String' },

    { name: 'Woah', valueType: 'String' },

    { name: 'Woah', valueType: 'String' },
  ])

  const order = [
    <TeamBasicInfo
      step={teamSettingsStep}
      setStep={setTeamSettingsStep}
      teamName={teamName}
      setTeamName={setTeamName}
      membersCanEdit={membersCanEdit}
      SetMembersCanEdit={SetMembersCanEdit}
    />,
    <TeamInfoGathered
      step={teamSettingsStep}
      setStep={setTeamSettingsStep}
      customUserInfoRequired={customUserInfoRequired}
      setCustomUserInfoRequired={setCustomUserInfoRequired}
    />,
  ]

  return <div>{order[teamSettingsStep]}</div>
}

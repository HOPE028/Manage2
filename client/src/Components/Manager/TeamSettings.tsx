import React, { useState, useEffect } from 'react'
import { step } from './SignUp'
import TeamBasicInfo from './ChoosingTeamSettings/TeamBasicInfo'
import TeamInfoGathered from './ChoosingTeamSettings/TeamInfoGathered'
import TeamAccessToInfo from './ChoosingTeamSettings/TeamAccessToInfo'

export interface interfaceCustomUserInfoRequired {
  name: string
  description: string
  valueType: string
}

export default function TeamSettingsManager(props: step) {
  const [teamName, setTeamName] = useState<String>('')
  const [membersCanEdit, SetMembersCanEdit] = useState<Boolean>(false)
  const [teamSettingsStep, setTeamSettingsStep] = useState<number>(0)
  const [customUserInfoRequired, setCustomUserInfoRequired] = useState<
    Array<interfaceCustomUserInfoRequired>
  >([{ name: '', description: '', valueType: 'String' }])
  const [memberAccessToInfoOnGeneralPage, setMemberAccessToInfoOnGeneralPage] =
    useState<Array<String>>([])
  const [
    generalAccessToInfoOnGeneralPage,
    setGeneralAccessToInfoOnGeneralPage,
  ] = useState<Array<String>>([])

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
    <TeamAccessToInfo
      step={teamSettingsStep}
      setStep={setTeamSettingsStep}
      customUserInfoRequired={customUserInfoRequired}
      memberAccessToInfoOnGeneralPage={memberAccessToInfoOnGeneralPage}
      setMemberAccessToInfoOnGeneralPage={setMemberAccessToInfoOnGeneralPage}
      generalAccessToInfoOnGeneralPage={generalAccessToInfoOnGeneralPage}
      setGeneralAccessToInfoOnGeneralPage={setGeneralAccessToInfoOnGeneralPage}
    />,
  ]

  return <div>{order[teamSettingsStep]}</div>
}

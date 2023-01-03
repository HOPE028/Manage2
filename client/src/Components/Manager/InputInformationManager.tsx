import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function InputInformationManager() {
  const getTeamRequiredInfo = async (UID: String) => {
    axios
      .get('http://localhost:4000/api/get_user_requirements_through_uid', {
        params: { userUID: UID },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }

  const getUserUID = async () => {
    axios
      .get('http://localhost:4000/api/get_current_user')
      .then((res) => res.data.data)
      .then((res) => getTeamRequiredInfo(res.uid))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUserUID()
  }, [])

  return <div>InputInformationManager</div>
}

import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function CreateUserManager() {
  const addUserToFirebase = async () => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/api/add_user',
      data: {},
    })
      .then((res) => res.data)
      .then((res) => console.log(res))
  }
}

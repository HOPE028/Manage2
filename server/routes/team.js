const { db } = require('../firebase/firebase-config')
const {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  writeBatch,
  getDoc,
} = require('firebase/firestore')

const createTeam = async (req, res, next) => {
  const {
    teamCode,
    customUserInfoRequired,
    specialUserInfoRequired,
    teamName,
    membersCanEdit,
    memberAccessToInfoOnGeneralPage,
    generalAccessToInfoOnGeneralPage,
    memberAccessToInfoOnIndividualPage,
    generalAccessToInfoOnIndividualPage,
    generalViewIndividualPage,
    memberViewIndividualPage,
    managerUserUID,
  } = req.body

  const teamSize = 0

  if (
    !teamCode ||
    !customUserInfoRequired ||
    !specialUserInfoRequired ||
    !teamName ||
    !memberAccessToInfoOnGeneralPage ||
    !generalAccessToInfoOnGeneralPage ||
    !memberAccessToInfoOnIndividualPage ||
    !generalAccessToInfoOnIndividualPage ||
    !managerUserUID
  ) {
    res.status(400).send({ Error: 'Not Enough Data' })
    console.log(
      teamCode,
      customUserInfoRequired,
      specialUserInfoRequired,
      teamName,
      membersCanEdit,
      memberAccessToInfoOnGeneralPage,
      generalAccessToInfoOnGeneralPage,
      memberAccessToInfoOnIndividualPage,
      generalAccessToInfoOnIndividualPage,
      generalViewIndividualPage,
      memberViewIndividualPage,
      managerUserUID + 'HELLO '
    )
    return
  }

  try {
    // Creating Team
    const batch = writeBatch(db)

    const teamRef = await batch.set(doc(db, 'Teams', teamCode), {
      Team_Size: teamSize,
      Team_Name: teamName,
      Members_Can_Edit: membersCanEdit,
    })

    // Creating less data user collection
    const shortenedUserRef = await batch.set(
      doc(db, 'Teams', teamCode, 'Shortened_Users', 'Shortened_Users'),
      {
        Shortened_Users: [],
      }
    )

    // Creating Settings
    const generalUserOnGeneralPageRef = await batch.set(
      doc(
        db,
        'Teams',
        teamCode,
        'Settings',
        'General_User_Access_On_General_Page'
      ),
      {
        Accessible_Fields: generalAccessToInfoOnGeneralPage,
      }
    )
    const memberOnGeneralPageRef = await batch.set(
      doc(db, 'Teams', teamCode, 'Settings', 'Member_Access_On_General_Page'),
      {
        Accessible_Fields: memberAccessToInfoOnGeneralPage,
      }
    )
    const generalUserOnIndividualPageRef = await batch.set(
      doc(
        db,
        'Teams',
        teamCode,
        'Settings',
        'General_User_Access_On_Individual_Page'
      ),
      {
        Acess_To_Fields: generalViewIndividualPage,
        Accessible_Fields: generalAccessToInfoOnIndividualPage,
      }
    )
    const memberOnIndividualPageRef = await batch.set(
      doc(
        db,
        'Teams',
        teamCode,
        'Settings',
        'Member_Access_On_Individual_Page'
      ),
      {
        Acess_To_Fields: memberViewIndividualPage,
        Accessible_Fields: memberAccessToInfoOnIndividualPage,
      }
    )

    const userInfoRequiredRef = await batch.set(
      doc(db, 'Teams', teamCode, 'Settings', 'UserInfoRequired'),
      {
        Custom_User_Info_Required: customUserInfoRequired,
        Special_User_Info_Required: specialUserInfoRequired,
      }
    )

    // Updating User Info

    const usersInTeamRef = await batch.set(
      doc(db, 'Teams', teamCode, 'Users', managerUserUID),
      { name: 'IDK' }
    )

    const updateUserInfo = await batch.update(
      doc(db, 'Users', managerUserUID),
      {
        team: teamCode,
        'data.teamSettingsCompleted': true,
      }
    )

    await batch.commit()

    res.status(200).send({ Data: 'Success' })
  } catch (error) {
    console.log(error)
    res.status(400).send({ Error: 'Problem' })
  }
}

const getTeamRequiredInfoThroughUserUID = async (req, res, next) => {
  const { userUID } = req.query

  if (!userUID) {
    res.status(400).send('Insufficient data')
    return
  }

  let teamCode = ''

  try {
    const userSnap = await getDoc(doc(db, 'Users', userUID))

    if (docSnap.exists()) {
      const data = docSnap.data()
      teamCode = data.team
    } else {
      console.log('No such document!')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('PROBLEM')
  }

  if (teamCode === '') {
    res.status(400).send('Not Signed In')
    return
  }

  try {
    const requiredInfoSnap = await getDoc(
      doc(db, 'Teams', teamCode, 'Settings', 'UserInfoRequired')
    )

    if (requiredInfoSnap.exists()) {
      const data = docSnap.data()
      res.status(200).send({ data: data })
    } else {
      console.log('Document Empty!')
      res.status(400).send('Document Empty')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Problem Happened')
  }
}

module.exports = {
  createTeam,
  getTeamRequiredInfoThroughUserUID,
}

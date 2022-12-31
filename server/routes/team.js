const { db } = require('../firebase/firebase-config')
const {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
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
    const teamRef = await setDoc(doc(db, 'Teams', teamCode), {
      Team_Size: teamSize,
      Team_Name: teamName,
      Members_Can_Edit: membersCanEdit,
    })

    // Creating less data user collection
    const shortenedUserRef = await setDoc(
      doc(db, 'Teams', teamCode, 'Shortened_Users', 'Shortened_Users'),
      {
        Shortened_Users: [],
      }
    )

    // Creating Settings
    const generalUserOnGeneralPageRef = await setDoc(
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
    const memberOnGeneralPageRef = await setDoc(
      doc(db, 'Teams', teamCode, 'Settings', 'Member_Access_On_General_Page'),
      {
        Accessible_Fields: memberAccessToInfoOnGeneralPage,
      }
    )
    const generalUserOnIndividualPageRef = await setDoc(
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
    const memberOnIndividualPageRef = await setDoc(
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

    const userInfoRequiredRef = await setDoc(
      doc(db, 'Teams', teamCode, 'Settings', 'UserInfoRequired'),
      {
        Custom_User_Info_Required: customUserInfoRequired,
        Special_User_Info_Required: specialUserInfoRequired,
      }
    )

    // Updating User Info

    const usersInTeamRef = await setDoc(
      doc(db, 'Teams', teamCode, 'Users', managerUserUID),
      { name: 'IDK' }
    )

    const updateUserInfo = await updateDoc(doc(db, 'Users', managerUserUID), {
      team: teamCode,
    })

    res.status(200).send({ Data: 'Success' })
  } catch (error) {
    console.log(error)
    res.status(400).send({ Error: 'Problem' })
  }
}

module.exports = {
  createTeam,
}

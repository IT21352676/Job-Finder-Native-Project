import React from 'react'
import ViewComponent from "../../../components/ProfileAdmin/ViewComponent/ViewComponent";

const HoldProfile = () => {
  return (
    <div>
      <center>
        <h1>Job Poste Deactivated Accounts</h1>
        <ViewComponent
          requestDataUrl="http://localhost:8000/getholdedaccounts"
          acceptUrl="http://localhost:8000/activateaccount"
          successAcceptMessage="Job Poster activated successfully"
          failureMessage="Failed to process request"
          acceptButtonName="Activate Account"
          modelname="Job Poster Details"
        />
      </center>
    </div>
  )
}

export default HoldProfile

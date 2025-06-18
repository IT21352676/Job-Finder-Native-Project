import React from 'react'
import ViewComponent from "../../../components/ProfileAdmin/ViewComponent/ViewComponent";


const JobSeekerDeactivatedProfiles = () => {
  return (
    <div>


      <center>
        <h1>Job Poster Declined Accounts</h1>
        <ViewComponent
          requestDataUrl="http://localhost:8000/declinedaccounts"
          acceptUrl="http://localhost:8000/acceptrequest"
          successAcceptMessage="Job Seeker activated successfully"
          failureMessage="Failed to process request"
          acceptButtonName="Accept Account"
          modelName="Job Seeker  Details"
        />
      </center>
    </div>
  )
}

export default JobSeekerDeactivatedProfiles

import React from 'react'
import JobSeekerViewComponent from '../JobSeekerViewComponents/JobSeekerViewComponents'


const JobSeekerDeactivatedProfiles = () => {
  return (
    <div>


<center>
  <h1>Job Seeker Deactivated Profiles</h1>
<JobSeekerViewComponent
      requestDataUrl="http://localhost:8000/getdeactivatedseekers"
      acceptUrl="http://localhost:8000/activateseeker"
      successAcceptMessage="Job Seeker activated successfully"
      failureMessage="Failed to process request"
      acceptButtonName="Activate Account"
      modelName="Job Seeker  Details"
    />
</center>
    </div>
  )
}

export default JobSeekerDeactivatedProfiles

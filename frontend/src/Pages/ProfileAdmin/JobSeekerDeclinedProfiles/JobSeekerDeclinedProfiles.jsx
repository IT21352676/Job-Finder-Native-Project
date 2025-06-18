import React from 'react'
import JobSeekerViewComponent from '../JobSeekerViewComponents/JobSeekerViewComponents'

const JobSeekerDeclinedProfiles = () => {
  return (
    <div>
       <center>
        <h1>Declined Job Seeker Profiles</h1>
        <JobSeekerViewComponent
          requestDataUrl="http://localhost:8000/declinedjobseerkers"
          acceptUrl="http://localhost:8000/acceptjobseekerrequest"
          successAcceptMessage="Job Seeker activated successfully"
          failureMessage="Failed to process request"
          acceptButtonName="Acccept Account"
          modelname="Job Poster Details"
        />
      </center>
    </div>
  )
}

export default JobSeekerDeclinedProfiles

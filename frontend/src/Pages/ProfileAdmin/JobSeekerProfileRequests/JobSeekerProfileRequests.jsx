import React from 'react'
import JobSeekerViewComponent from '../JobSeekerViewComponents/JobSeekerViewComponents'

const JobSeekerProfileRequests = () => {
  return (
    <div>
       <center>
       <h1>Job Seeker Requests</h1>
      <JobSeekerViewComponent
          requestDataUrl="http://localhost:8000/getjobseekerrequests"
          acceptUrl="http://localhost:8000/acceptjobseekerrequest"
          declineUrl="http://localhost:8000/declinejobseeker"
          successAcceptMessage="Job Seeker Request accepted successfully"
          successDeclineMessage="Job Seeker Request declined successfully"
          failureMessage="Failed to process request"
          acceptButtonName="Accept"
          declineButtonName="Decline"
          modelName="Job Seeker Details"
        />
       </center>
    </div>
  )
}

export default JobSeekerProfileRequests

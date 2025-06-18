import React from "react";
import JobSeekerViewComponent from "../JobSeekerViewComponents/JobSeekerViewComponents";

const JobSeekerActiveProfiles = () => {
  return (
    <div>
      <center>
      <h1>Active Job Seekers </h1>
        <JobSeekerViewComponent
          requestDataUrl="http://localhost:8000/activejobseerkers"
          declineUrl="http://localhost:8000/deactivateseeker"
          successDeclineMessage="Job Seeker deactivated successfully"
          failureMessage="Failed to process request"
          declineButtonName="Deactivate Account"
          modelName="Job Seeker Details"
        />
      </center>
    </div>
  );
};

export default JobSeekerActiveProfiles;

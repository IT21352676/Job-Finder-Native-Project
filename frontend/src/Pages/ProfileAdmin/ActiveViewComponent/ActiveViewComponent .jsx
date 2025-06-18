import React from "react";
import ViewComponent from "../../../components/ProfileAdmin/ViewComponent/ViewComponent";

const ActiveViewComponent = () => {
  return (
    <div>
      <center>
      <h1>Active Job Posters </h1>
        <ViewComponent
          requestDataUrl="http://localhost:8000/activeaccounts"
          declineUrl="http://localhost:8000/deactivateaccount"
          successAcceptMessage="Job Poster deactivated successfully"
          successDeclineMessage="Job Poster  successfully"
          failureMessage="Failed to process request"
          declineButtonName="Deactivate Account"
          modelname="Job Poster Details"
        />
      </center>
    </div>
  );
};

export default ActiveViewComponent;

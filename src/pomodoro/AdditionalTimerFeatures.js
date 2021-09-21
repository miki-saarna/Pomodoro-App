import React from "react";
import { secondsToDuration } from "../utils/duration/index";
import CurrentSessionTotalDuration from "./CurrentSessionTotalDuration";
import ProgressBar from "./ProgressBar";

function AdditionalTimerFeatures({session, focusDuration, breakDuration}) {
    const progressBarHandler = () => {
        if(session?.label === "Focusing") {
        return ProgressBar(session, focusDuration)
        } else if(session?.label === "On Break") {
        return ProgressBar(session, breakDuration)
        }
      }

    return (
        <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
              {session.label} for <CurrentSessionTotalDuration currentSession={session} focusDuration={focusDuration} breakDuration={breakDuration} /> minutes
              
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {/* chaining chaining operator and ternary operator */}
              {/* {formData.session?.timeRemaining ? secondsToDuration(formData.session.timeRemaining) : 0} remaining */}
              {/* amended original above */}
              {session ? secondsToDuration(session.timeRemaining) : 0} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progressBarHandler() * 100} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${progressBarHandler() * 100}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
      )
}

export default AdditionalTimerFeatures;
import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration/index";
import DurationSetter from "./DurationSetter";
import IncrementDecrementButton from "./IncrementDecrementButton";
import AdditionalTimerFeatures from "./AdditionalTimerFeatures";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const focus = prevState.session.label;
  const timeRemaining = Math.max(0, prevState.session.timeRemaining - 1);
  if(focus === 'Focusing'){
  return {
    ...prevState,
    session: {
      label: "Focusing",
      timeRemaining: timeRemaining}
  };
} else {
  return {
    ...prevState,
    session: {
    label: "On Break",
    timeRemaining: timeRemaining}
  };
}
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.session.label === "Focusing") {
      return {
        ...currentSession,
        session: {
        label: "On Break",
        timeRemaining: breakDuration * 60,
        }
      };
    }
    return {
      ...currentSession,
      session: {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
      }
    };
  };
}

function Pomodoro() {
  const initialFormState = {
    isTimerRunning: false,
    session: null,
    disable: true,
    focusDuration: 25,
    breakDuration: 5,
  }
  const[formData, setFormData] = useState({...initialFormState});
  
  const focusDuration = formData.focusDuration;
  const breakDuration = formData.breakDuration;

  // appears to have bug: button must NOT be clicked in the span-element in the center
  const durationHandler = (event) => {
    if(event.target.name === "focus") {
      const focusTime = DurationSetter(event, focusDuration);
      setFormData({...formData, focusDuration: focusTime})
    } else {
      const breakTime = DurationSetter(event, breakDuration);
      setFormData({...formData, breakDuration: breakTime})
    }
  }

  // stops timer when stop button is pressed; also disables stop button since timer is already stopped
  const stopTimerHandler = () => { setFormData({...initialFormState, disable: true}) }
  
  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => { 
      if (formData.session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setFormData(nextSession(focusDuration, breakDuration));
      }
      return setFormData(nextTick);
    },
    formData.isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setFormData((prevState) => {
      // setting state to opposite of prevState
      const nextState = !prevState.isTimerRunning;
      // if time is now playing ('true')
      if (nextState) {
          if(prevState.session === null) {
            return {
              ...formData,
              isTimerRunning: nextState,
              disable: false,
              session: {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            }}
          }
        return {...formData,
                isTimerRunning: nextState,
                session: prevState.session}
      }
      // if now paused ('false')
      if(!nextState) {return {...formData, isTimerRunning: nextState}};
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <IncrementDecrementButton duration={durationHandler} dataInfo='decrease-focus' disable={!formData.disable} value='decrease' name='focus' spanClass='oi oi-minus' />
              <IncrementDecrementButton duration={durationHandler} dataInfo='increase-focus' disable={!formData.disable} value='increase' name='focus' spanClass='oi oi-plus' />
              {/* <button
        type="button"
        className="btn btn-primary"
        data-testid='decrease-focus'
        onClick={durationHandler}
        disabled={!formData.disable}
        name='focus'
        value='decrease'
      >
        <span className='oi oi-plus' onClick={durationHandler} name='focus' value='decrease' type='button' /> */}
        {/* <span className={spanClass} /> */}
      {/* </button> */}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
              <IncrementDecrementButton duration={durationHandler} dataInfo='decrease-break' disable={!formData.disable} value='decrease' name='break' spanClass='oi oi-minus' />
              <IncrementDecrementButton duration={durationHandler} dataInfo='increase-break' disable={!formData.disable} value='increase' name='break' spanClass='oi oi-plus' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !formData.isTimerRunning,
                  "oi-media-pause": formData.isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              onClick={stopTimerHandler}
              disabled={formData.disable}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      {/* create ternary operator to run component that displays additional timer features only when session is not null */}
      {formData.session? <AdditionalTimerFeatures session={formData.session} focusDuration={focusDuration} breakDuration={breakDuration} /> : null}
    </div>
  );
}

export default Pomodoro;
